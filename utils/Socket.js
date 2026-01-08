const { Server } = require("socket.io");
const leoProfanity = require("leo-profanity");
leoProfanity.loadDictionary();
leoProfanity.add(leoProfanity.getDictionary("fr"));

module.exports = (server) => {
    const allowedOrigins = [
        "http://localhost:8080",
        "https://tp-api.matthisripoche.com",
    ];

    const io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST"],
        },
    });

    const users = new Map();

    io.on("connection", (socket) => {
        socket.on("user:join", (data) => {
            const username = data.username;
            users.set(socket.id, username);

            socket.broadcast.emit("user:joined", { username });
        });

        socket.on("chat:message", (data) => {
            // Nettoyer les gros mots mais conserver le HTML
            const censoredMessage = leoProfanity.clean(data.message);

            io.emit("chat:message", {
                author: data.author,
                message: censoredMessage,
                allowHtml: true, // Ajout d'un indicateur pour le frontend
            });
        });

        socket.on("disconnect", () => {
            const username = users.get(socket.id);

            if (username) {
                console.log(`🔴 ${username} a quitté le chat (${socket.id})`);

                socket.broadcast.emit("user:left", { username });

                users.delete(socket.id);
            } else {
                console.log("🔴 User disconnected :", socket.id);
            }
        });
    });

    return io;
};

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
        console.log("🟢 User connected :", socket.id);

        socket.on("user:join", (data) => {
            const username = data.username;
            users.set(socket.id, username);

            console.log(`👤 ${username} a rejoint le chat (${socket.id})`);

            // Notifier tous les autres utilisateurs
            socket.broadcast.emit("user:joined", { username });
        });

        socket.on("chat:message", (data) => {
            data.message = leoProfanity.clean(data.message);
            io.emit("chat:message", data);
        });

        socket.on("disconnect", () => {
            const username = users.get(socket.id);

            if (username) {
                console.log(`🔴 ${username} a quitté le chat (${socket.id})`);

                // Notifier tous les utilisateurs de la déconnexion
                socket.broadcast.emit("user:left", { username });

                // Retirer l'utilisateur de la liste
                users.delete(socket.id);
            } else {
                console.log("🔴 User disconnected :", socket.id);
            }
        });
    });

    return io;
};

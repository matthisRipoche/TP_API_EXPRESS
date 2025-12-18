const { Server } = require("socket.io");

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

    // Stocker les utilisateurs connectés
    const users = new Map();

    io.on("connection", (socket) => {
        console.log("🟢 User connected :", socket.id);

        // Quand un utilisateur rejoint avec son nom
        socket.on("user:join", (data) => {
            const username = data.username;
            users.set(socket.id, username);

            console.log(`👤 ${username} a rejoint le chat (${socket.id})`);

            // Notifier tous les autres utilisateurs
            socket.broadcast.emit("user:joined", { username });
        });

        // Réception et diffusion des messages
        socket.on("chat:message", (data) => {
            socket.broadcast.emit("chat:message", data);
        });

        // Déconnexion
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

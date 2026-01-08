const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
const methodOverride = require("method-override");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const clientsRouter = require("./routes/clients");

const isAuthenticated = require("./middlewares/isAuthenticated");

const app = express();
const server = http.createServer(app);

// =======================
// SOCKET.IO
// =======================
const initSocket = require("./utils/Socket");

const io = initSocket(server);
app.set("io", io);

// Sert socket.io.js depuis node_modules
app.get("/socket.io.js", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "node_modules",
            "socket.io/client-dist/socket.io.js"
        )
    );
});

// =======================
// VIEW ENGINE
// =======================
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// =======================
// MIDDLEWARES = plugin
// =======================
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

app.use(
    session({
        secret: "ba19f78fd5034b01894854b94367b72a266f15f45013d7ff8d920bb53979a2707a1dd60a5e371cade74ca8ce36836d9e5878549767fd2c6e92bbf7cab8763e01",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
);

app.use((req, res, next) => {
    res.locals.user = req.session ? req.session.user : null;
    next();
});

// =======================
// ROUTES
// =======================
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/clients", isAuthenticated, clientsRouter);

// =======================
// 404
// =======================
app.use((req, res) => {
    res.status(404).render("404", {
        title: "404 - Page introuvable",
    });
});

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 Server + Socket.io on http://localhost:${PORT}`);
});

module.exports = app;

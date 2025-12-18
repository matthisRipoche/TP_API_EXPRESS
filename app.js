var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var clientsRouter = require("./routes/clients");

const isAuthenticated = require("./middlewares/isAuthenticated");

var app = express();
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
// MIDDLEWARES
// =======================
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
// ERROR HANDLER
// =======================
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 Server + Socket.io on http://localhost:${PORT}`);
});

module.exports = app;

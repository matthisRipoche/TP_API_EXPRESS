var express = require("express");
var router = express.Router();
const AuthController = require("../controllers/AuthController");
const DabController = require("../controllers/DabController");
const ChatController = require("../controllers/ChatController");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/about", function (req, res, next) {
    res.render("about", { title: "About" });
});

router.get("/chat", ChatController.getChat);

router.get("/dab", DabController.getDab);

router.post("/dab", DabController.postDab);

// GET login page
router.get("/login", AuthController.getLogin);

// POST login
router.post("/login", AuthController.postLogin);

// GET logout
router.post("/logout", AuthController.logout);

module.exports = router;

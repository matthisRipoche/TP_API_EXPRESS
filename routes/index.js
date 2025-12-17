var express = require("express");
var router = express.Router();
const {
    getLogin,
    postLogin,
    logout,
} = require("../controllers/AuthController");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

// GET login page
router.get("/login", getLogin);

// POST login
router.post("/login", postLogin);

// GET logout
router.post("/logout", logout);

module.exports = router;

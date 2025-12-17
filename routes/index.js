var express = require("express");
var router = express.Router();
const {
    getLogin,
    postLogin,
    logout,
} = require("../controllers/AuthController");
const { getDab, postDab } = require("../controllers/DabController");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/about", function (req, res, next) {
    res.render("about", { title: "About" });
});

router.get("/dab", getDab);

router.post("/dab", postDab);

// GET login page
router.get("/login", getLogin);

// POST login
router.post("/login", postLogin);

// GET logout
router.post("/logout", logout);

module.exports = router;

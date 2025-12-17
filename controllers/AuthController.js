exports.getLogin = (req, res) => {
    res.render("login", { title: "Login", error: null });
};

exports.postLogin = (req, res) => {
    const { username, password } = req.body;

    if (username !== "admin" || password !== "admin") {
        return res.render("login", {
            title: "Login",
            error: "Nom d'utilisateur ou mot de passe incorrect",
        });
    }

    req.session.user = {
        username: "admin",
    };

    res.redirect("/");
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};

var express = require("express");
var router = express.Router();
const clients = require("../data/clients");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.render("clients/listClients", { clients, title: "Liste des Clients" });
});

router.get("/:id", function (req, res, next) {
    const client = clients.find(
        (client) => client.id === parseInt(req.params.id)
    );
    if (!client)
        return res.status(404).render("404", { title: "Client non trouvé" });
    res.render("clients/detailClient", { client, title: client.name });
});

module.exports = router;

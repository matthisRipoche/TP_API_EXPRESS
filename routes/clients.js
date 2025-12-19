var express = require("express");
var router = express.Router();
const clients = require("../data/clients");
const ClientController = require("../controllers/ClientController");

/* GET users listing. */
router.get("/", ClientController.getListeClients);

router.get("/create", ClientController.showCreateClient);

router.get("/edit/:id", ClientController.showEditClient);

router.get("/:id", ClientController.getClient);

router.post("/", ClientController.createClient);

router.put("/:id", ClientController.updateClient);

router.delete("/:id", ClientController.deleteClient);

module.exports = router;

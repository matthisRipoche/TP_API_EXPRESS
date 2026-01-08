const express = require("express");
const router = express.Router();
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

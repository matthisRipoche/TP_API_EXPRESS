const express = require("express");
const router = express.Router();
const todoController = require("../controllers/TodoController");

// Récupérer toutes les todos
router.get("/", todoController.getTodos);

// Récupérer une todo par son ID
router.get("/:id", todoController.getTodo);

// Créer une nouvelle todo
router.post("/", todoController.createTodo);

// Mettre à jour une todo
router.put("/:id", todoController.updateTodo);

// Supprimer une todo
router.delete("/:id", todoController.deleteTodo);

module.exports = router;

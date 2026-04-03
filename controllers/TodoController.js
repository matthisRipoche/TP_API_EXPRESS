const TodoService = require("../services/TodoService");

exports.getTodos = async (req, res) => {
    try {
        const todos = await TodoService.getAllTodos();
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.getTodo = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const todo = await TodoService.getTodoById(id);

        if (!todo) {
            return res.status(404).json({ error: "Todo non trouvé" });
        }
        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.createTodo = async (req, res) => {
    const { title, description, completed } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Le titre est requis" });
    }

    try {
        const todo = await TodoService.createTodo({
            title,
            description: description || null,
            completed: completed || false,
        });
        res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur création todo" });
    }
};

exports.updateTodo = async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;

    try {
        const todo = await TodoService.updateTodo(id, { title, description, completed });
        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur mise à jour todo" });
    }
};

exports.deleteTodo = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await TodoService.deleteTodo(id);
        res.json({ message: "Todo supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur suppression todo" });
    }
};

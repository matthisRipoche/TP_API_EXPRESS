const prisma = require("../utils/prisma");

class TodoService {
    static async getAllTodos() {
        return await prisma.todos.findMany();
    }

    static async getTodoById(id) {
        return await prisma.todos.findUnique({
            where: { id },
        });
    }

    static async createTodo(data) {
        return await prisma.todos.create({
            data,
        });
    }

    static async updateTodo(id, data) {
        return await prisma.todos.update({
            where: { id },
            data,
        });
    }

    static async deleteTodo(id) {
        return await prisma.todos.delete({
            where: { id },
        });
    }

    static async deleteAllTodos() {
        return await prisma.todos.deleteMany();
    }
}

module.exports = TodoService;

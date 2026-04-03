const prisma = require("../utils/prisma");

class ClientService {
    static async getAllClients() {
        return await prisma.users.findMany();
    }

    static async getClientById(id) {
        return await prisma.users.findUnique({
            where: { id },
        });
    }

    static async createClient(data) {
        return await prisma.users.create({
            data,
        });
    }

    static async updateClient(id, data) {
        return await prisma.users.update({
            where: { id },
            data,
        });
    }

    static async deleteClient(id) {
        return await prisma.users.delete({
            where: { id },
        });
    }
}

module.exports = ClientService;

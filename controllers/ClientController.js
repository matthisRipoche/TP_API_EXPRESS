const ClientService = require("../services/ClientService");

exports.getListeClients = async (req, res) => {
    try {
        const clients = await ClientService.getAllClients();
        res.render("clients/listClients", {
            title: "Liste des Clients",
            clients,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

exports.getClient = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await ClientService.getClientById(id);

        if (!client) {
            return res
                .status(404)
                .render("404", { title: "Client non trouvé" });
        }

        res.render("clients/detailClient", {
            title: client.name,
            client,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

exports.showCreateClient = (req, res) => {
    res.render("clients/addClient", { title: "Créer un client" });
};

exports.showEditClient = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await ClientService.getClientById(id);

        console.log(client);

        if (!client) {
            return res
                .status(404)
                .render("404", { title: "Client non trouvé" });
        }

        res.render("clients/editClient", {
            title: "Modifier un client",
            client,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
};

exports.createClient = async (req, res) => {
    const { name, email, role } = req.body;

    try {
        await ClientService.createClient({ name, email, role });
        res.redirect("/clients");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur création client");
    }
};

exports.updateClient = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, role } = req.body;

    try {
        await ClientService.updateClient(id, { name, email, role });
        res.redirect(`/clients/${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur mise à jour client");
    }
};

exports.deleteClient = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await ClientService.deleteClient(id);
        res.redirect("/clients");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur suppression client");
    }
};

# TP API Express

Projet Express.js avec gestion des clients, authentification, et chat en temps réel.

## 🚀 Fonctionnalités

- Gestion des clients (CRUD complet)
- Système d'authentification
- Chat en temps réel avec Socket.io
- Interface responsive avec design moderne
- Base de données Prisma avec SQLite

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone <url-du-repository>
cd tp-api-express
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev --name init
```

### 4. Compiler les styles SCSS

Le projet utilise Sass pour la compilation des styles. Vous avez deux options :


```bash
npm run sass
```

## 🏃‍♂️ Lancer le projet

### Développement

```bash
# Lancer le serveur de développement
npm start
```

Le serveur sera accessible sur `http://localhost:8080`

### Production

```bash
# Lancer en mode production
NODE_ENV=production npm start
```

## 📁 Structure du projet

```
tp-api-express/
├── bin/                    # Scripts de démarrage
│   └── www
├── controllers/            # Logique métier
│   ├── AuthController.js
│   ├── ChatController.js
│   ├── ClientController.js
│   └── DabController.js
├── data/                   # Données de test
│   └── clients.js
├── middlewares/            # Middlewares Express
│   └── isAuthenticated.js
├── prisma/                 # Configuration Prisma
│   ├── migrations/
│   └── schema.prisma
├── public/                 # Fichiers statiques
│   ├── scss/              # Sources SCSS
│   │   ├── _addClient.scss
│   │   ├── _editClient.scss
│   │   ├── _listClients.scss
│   │   └── style.scss
│   └── stylesheets/       # CSS compilé
│       └── style.css
├── routes/                 # Routes Express
│   ├── clients.js
│   ├── index.js
│   └── users.js
├── views/                  # Templates EJS
│   ├── clients/
│   │   ├── addClient.ejs
│   │   ├── detailClient.ejs
│   │   ├── editClient.ejs
│   │   └── listClients.ejs
│   └── parts/
├── app.js                  # Configuration principale
├── package.json
└── README.md
```

## 🎨 Styles

Le projet utilise une architecture SCSS modulaire :

- `style.scss` : Fichier principal qui importe tous les modules
- `_addClient.scss` : Styles pour le formulaire d'ajout de client
- `_editClient.scss` : Styles pour le formulaire de modification de client
- `_listClients.scss` : Styles pour la liste des clients
- `_detailClient.scss` : Styles pour la page de détail d'un client

### Variables globales disponibles

- `$bg-dark: #0d0b14` : Fond sombre
- `$violet: #b974ff` : Couleur principale violette
- `$violet-light: #d9a7ff` : Violet clair
- `$text-light: #e6e2ff` : Texte clair

## 📝 Scripts disponibles

```bash
# Démarrer le serveur
npm start

# Compiler les styles SCSS
npm run sass

# Surveiller les changements SCSS
npm run sass:watch

# Générer le client Prisma
npx prisma generate

# Créer une migration
npx prisma migrate dev --name <nom-de-la-migration>

# Voir la base de données
npx prisma studio
```

## 🔧 Configuration

### Variables d'environnement

Le projet utilise une clé secrète pour les sessions. Vous pouvez la modifier dans `app.js` :

```javascript
app.use(
    session({
        secret: "votre-clé-secrète-ici",
        // ...
    })
);
```

### Base de données

Le projet utilise SQLite par défaut. Pour changer de base de données, modifiez `prisma/schema.prisma` :

```prisma
datasource db {
  provider = "postgresql" // ou mysql, etc.
  url      = env("DATABASE_URL")
}
```

## 🌐 Routes principales

### Clients

- `GET /clients` - Liste des clients
- `GET /clients/add` - Formulaire d'ajout
- `POST /clients` - Créer un client
- `GET /clients/:id` - Détail d'un client
- `GET /clients/edit/:id` - Formulaire de modification
- `PUT /clients/:id` - Mettre à jour un client
- `DELETE /clients/:id` - Supprimer un client

### Authentification

- `GET /login` - Page de connexion
- `POST /login` - Connexion
- `GET /logout` - Déconnexion

### Autres

- `GET /` - Page d'accueil
- `GET /about` - Page à propos
- `GET /chat` - Chat en temps réel

## 🐛 Dépannage

### Problèmes courants

1. **Erreur "Can't find stylesheet to import"**
   - Assurez-vous que tous les fichiers SCSS existent dans `public/scss/`
   - Vérifiez que les imports dans `style.scss` correspondent aux noms de fichiers

2. **Erreur Prisma**
   - Exécutez `npx prisma generate` après avoir modifié le schéma
   - Assurez-vous que la base de données est initialisée avec `npx prisma migrate dev`

3. **Port déjà utilisé**
   - Changez le port dans `bin/www` ou utilisez la variable d'environnement `PORT`

### Dépendances manquantes

Si vous rencontrez des erreurs de dépendances, réinstallez tout :

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Notes de développement

- Le projet utilise EJS comme moteur de templates
- Socket.io est configuré pour le chat en temps réel
- Les styles suivent une approche "glassmorphism" moderne
- Le code utilise des `const` et `let` au lieu de `var` pour une meilleure gestion de la portée

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.
# Utiliser Node Alpine pour une image légère
FROM node:20-alpine

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer toutes les dépendances
RUN npm ci

# Copier tout le reste de l'application
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port utilisé par ton app
EXPOSE 3000

# Lancer l'application
CMD ["node", "app.js"]

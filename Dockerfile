# ==========================
# Stage 1 : build
# ==========================
FROM node:20-alpine AS builder

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier le reste des fichiers
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# ==========================
# Stage 2 : production
# ==========================
FROM node:20-alpine

WORKDIR /app

# Expose port
EXPOSE 3000

# Lancer l'application
CMD ["node", "app.js"]

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

# Copier uniquement ce qui est nécessaire depuis le build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/*.js ./
COPY --from=builder /app/views ./views
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Lancer l'application
CMD ["node", "app.js"]

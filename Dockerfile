# ==========================
# Stage 1 : build
# ==========================
FROM node:20-alpine AS builder

# Set working directory
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

# Copier uniquement les fichiers nécessaires depuis le build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/*.js ./
COPY --from=builder /app/views ./views
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (caching layer)
COPY package*.json ./

# Install only prod dependencies
RUN npm ci --only=production

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]
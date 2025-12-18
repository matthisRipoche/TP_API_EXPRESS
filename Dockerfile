FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (caching layer)
COPY package*.json ./

# Install all dependencies (prod + dev)
RUN npm install

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]

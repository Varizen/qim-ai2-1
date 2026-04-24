# Backend Dockerfile
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Create storage directory for uploads
RUN mkdir -p storage

EXPOSE 4000

CMD ["node", "server.js"]

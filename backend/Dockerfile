# Backend Dockerfile
FROM node:22-alpine

WORKDIR /app

# Install wget for healthchecks + curl for debugging
RUN apk add --no-cache wget curl

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy app source
COPY . .

# Create storage directory for uploads
RUN mkdir -p storage

EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --spider -q http://localhost:4000/health || exit 1

CMD ["node", "server.js"]

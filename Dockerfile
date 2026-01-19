# Build stage
FROM node:20-slim AS build
WORKDIR /app

# Install dependencies with a clean, reproducible install
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:1.27-alpine AS runtime

# Copy static build output
COPY --from=build /app/build /usr/share/nginx/html

# Provide SPA routing support
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

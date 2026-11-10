# Stage 1: Build Angular application
FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Select build configuration (staging by default in CI, production for releases)
ARG BUILD_CONFIGURATION=staging
RUN npm run build -- --configuration=${BUILD_CONFIGURATION}


# Stage 2: Serve Angular using Nginx
FROM nginx:stable-alpine

# Custom Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy compiled Angular application
COPY --from=builder /app/dist/aadityasoftwares/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


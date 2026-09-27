# ==========================================
# Stage 1: Build React application
# ==========================================
FROM node:24-alpine AS builder

WORKDIR /app

# Receive Vite API URL during Docker build.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Build the production application
RUN npm run build


# ==========================================
# Stage 2: Serve application with Nginx
# ==========================================
FROM nginx:alpine

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy React production build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
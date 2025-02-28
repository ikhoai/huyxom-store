FROM node:20-alpine as build

WORKDIR /app

# Set Node memory limits and other optimization flags
ENV NODE_OPTIONS="--max-old-space-size=1024"
ENV npm_config_cache=/tmp/.npm

# Copy package files first for better layer caching
COPY package*.json ./

# Use npm ci instead of npm install for more efficient installations
RUN npm ci --no-audit --no-fund

COPY . .

# Create a .env file for production
RUN echo "REACT_APP_API_URL=/api" > .env.production

# Build with reduced workers if needed
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Add custom nginx config to handle React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 
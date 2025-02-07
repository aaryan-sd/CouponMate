# Use Node.js as the build environment
FROM node:18-alpine AS frontend

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as the server
FROM nginx:alpine

# Copy the built React app to Nginx's default html directory
COPY --from=frontend /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx default, instead of 5173)
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]

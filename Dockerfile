# Use the official Node.js image as the base image
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN npm run build -- --configuration production

# Use a lightweight web server to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/kofejob-angular /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
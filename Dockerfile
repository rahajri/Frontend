# Stage 1: Build the Angular application
FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

RUN npm install -g @angular/cli --legacy-peer-deps

COPY . .

RUN npm run build --configuration=production

# Stage 2: Serve the Angular application using nginx
FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/interim-online/browser /usr/share/nginx/html

EXPOSE 80

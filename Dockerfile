FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build --prod

FROM nginx:1.13-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
RUN mkdir -p /usr/share/nginx/html/auth-portal
COPY --from=build /app/dist/auth-portal /usr/share/nginx/html/auth-portal

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8002
CMD ["nginx", "-g", "daemon off;"]

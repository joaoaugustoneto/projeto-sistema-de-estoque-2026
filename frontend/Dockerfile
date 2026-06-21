# Estágio 1: Build da aplicação React
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servir com Nginx
FROM nginx:alpine
# Copia o build do React para o diretório de HTML do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Expõe a porta padrão do Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
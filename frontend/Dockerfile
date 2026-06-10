# Estágio 1: Build da aplicação React
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servindo os arquivos estáticos com Nginx
FROM nginx:alpine
# Copia o build gerado para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Expõe a porta padrão do servidor web
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
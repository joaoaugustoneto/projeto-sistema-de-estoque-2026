# Utiliza a imagem oficial leve do Node.js
FROM node:20-alpine

# Define o diretório de trabalho interno
WORKDIR /usr/src/app

# Copia os arquivos de mapeamento de dependências
COPY package*.json ./

# Instala as dependências de produção
RUN npm install --only=production

# Copia todo o restante do código do backend
COPY . .

# Expõe a porta interna da API
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "src/server.js"]
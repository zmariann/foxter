FROM node:16.16.0-alpine3.16
WORKDIR /app
RUN npm install ts-node -g
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 5000
CMD ["ts-node", "./server.ts"]

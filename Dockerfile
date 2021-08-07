FROM node:14.16.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# Rodar em produção
# RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
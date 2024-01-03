FROM node:16.17.1-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5001

ENV ADDRESS=0.0.0.0 PORT=5001

CMD [ "npm", "start"]
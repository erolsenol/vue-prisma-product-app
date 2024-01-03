FROM node:18.16.0-alpine3.17

WORKDIR /usr/lib

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

ENV ADDRESS=0.0.0.0 PORT=4000

CMD [ "npm", "start"]
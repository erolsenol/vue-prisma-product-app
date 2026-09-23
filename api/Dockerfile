FROM node:22-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate
RUN npm run build

EXPOSE 5001

ENV ADDRESS=0.0.0.0 PORT=5001

CMD [ "npm", "start"]

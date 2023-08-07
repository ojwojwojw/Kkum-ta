FROM node:18

WORKDIR /app

RUN mkdir ./server

WORKDIR ./server

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8090

CMD ["npm", "start"]
FROM node:18

WORKDIR /app

RUN mkdir ./server_device

WORKDIR ./server_device

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8085

CMD ["npm", "start"]
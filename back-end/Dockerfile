
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY app.js ./
COPY . .

EXPOSE 5000

CMD ["node", "app.js"]
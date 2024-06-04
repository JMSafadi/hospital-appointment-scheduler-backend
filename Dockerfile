FROM node:18

WORKDIR /hospital-appointment-scheduler

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

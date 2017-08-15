FROM node:8

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install --quiet

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

FROM node:17-alpine

WORKDIR /home/node/

COPY . /home/node/

RUN npm install

RUN npm run migrate

EXPOSE $PORT

USER node

CMD ["npm", "run", "start"]
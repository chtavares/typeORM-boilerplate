FROM node:12.16.1

ENV HOME=/home/app

COPY package.json package-lock.json $HOME/api/

WORKDIR $HOME/api

RUN yarn install

COPY . $HOME/api

CMD ["yarn", "dev"]

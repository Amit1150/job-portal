# FROM node:8-alpine also works here for a smaller image
FROM node:10

ENV PORT 3000
EXPOSE $PORT

RUN mkdir /usr/app
WORKDIR /usr/app

# install dependencies first
COPY package.json .
RUN npm install

# copy in our source code last, as it changes the most
COPY . .

ENTRYPOINT ["node", "./bin/www"]
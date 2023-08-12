# docker build -t my-egg-app .
# docker-compose build
# docker-compose up


FROM node:slim
RUN mkdir /myapp
WORKDIR /myapp
COPY package.json /myapp/package.json
RUN npm i --registry=https://registry.npm.taobao.org
COPY . /myapp/





FROM mhart/alpine-node:12
EXPOSE 25060
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
FROM node:11.4
COPY . /app
WORKDIR /app
EXPOSE 3000
CMD node app.js

FROM node:latest

WORKDIR /app
ADD app /app/app
ADD dist /app/dist
ADD package.json webpack.config.js /app/
RUN npm install

EXPOSE 8090

CMD ["npm","start"]
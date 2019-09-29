FROM node:dubnium
WORKDIR /usr/src/app
COPY ./package.json ./.babelrc ./webpack.config.js ./
RUN npm i
COPY src/webui/ ./
EXPOSE 80
ENV PORT=80
ENTRYPOINT npm run start:webui

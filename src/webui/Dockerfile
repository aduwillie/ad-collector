FROM node:dubnium
WORKDIR /usr/src/app
COPY ./package.json ./.babelrc ./webpack.config.js ./jest.init.js ./
RUN npm i
COPY src/webui/ ./
EXPOSE 80
ARG COOKIE_SECRET
ENV PORT=80
ENV COOKIE_SECRET=${COOKIE_SECRET}
ENV JWT_SECRET=${COOKIE_SECRET}
ENTRYPOINT ./node_modules/.bin/babel-node index.js

FROM node
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install
COPY ./build ./build
RUN npm install -g serve
EXPOSE 3000
CMD [ "serve", "-s", "build" ]
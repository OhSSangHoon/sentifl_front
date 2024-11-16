FROM node:20.11
WORKDIR /frontend
RUN npm install -g serve
COPY ./build ./build
EXPOSE 3000
CMD [ "serve", "-s", "build", "-l", "3000"]
FROM node:8.15.1-alpine
COPY . /home/node/app
WORKDIR /home/node/app
ENV PORT=80
ENV NODE_ENV=production
ENV DEBUG=*
EXPOSE 80
CMD [ "node", "index.js" ]

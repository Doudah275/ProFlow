FROM node:24-alpine

# REVIEW: Pin the runtime/dependency strategy and use a production install with
# a lockfile in deployment; the current image installs all dependencies.
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
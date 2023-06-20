FROM node:alpine AS builder-image

WORKDIR /app/

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine AS server-image

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production
COPY --from=builder-image ./app/build ./build

EXPOSE 8000

CMD [ "npm", "start" ]
FROM node:16.14.0-alpine

WORKDIR /app

COPY package* ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production

ENV PORT=8080

CMD ["npm", "start"]

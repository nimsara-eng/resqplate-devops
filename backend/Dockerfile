
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src

ENV NODE_ENV=production

EXPOSE 5000

USER node

# Run node directly (not via npm) so it receives the stop signal from Docker
CMD ["node", "src/server.js"]

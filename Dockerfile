FROM node:18-alpine
WORKDIR /app
COPY . .

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN npm install
CMD ["npm", "start"]

EXPOSE 8080
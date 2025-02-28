FROM node:18-alpine

WORKDIR /usr/src/app

# Install curl for healthchecks
RUN apk --no-cache add curl

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"] 
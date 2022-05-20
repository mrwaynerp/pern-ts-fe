FROM node:17.8.0
WORKDIR /app
COPY . .
RUN npm install --only=prod
CMD npm start
EXPOSE 3000
FROM node:18

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "/dist/index.js"]
FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY . .
RUN npm i
# RUN npm i -g rimraf @nestjs/cli
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine as production
COPY  --from=build /usr/src/app/node_modules ./node_modules
COPY  --from=build /usr/src/app/dist ./dist

EXPOSE 5000
CMD [ "node", "dist/main.js" ]
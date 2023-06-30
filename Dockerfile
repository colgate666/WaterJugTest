FROM node:alpine3.18 AS backend-build

WORKDIR /build

COPY dev ./dev
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm i
RUN npm run build

FROM node:alpine3.18 AS release

WORKDIR /app

COPY --from=backend-build /build/prod ./prod
COPY --from=backend-build /build/package.json .
COPY --from=backend-build /build/package-lock.json .

RUN npm i --omit=dev

CMD [ "npm", "run", "prod" ]
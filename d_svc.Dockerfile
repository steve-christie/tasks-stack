FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app


COPY package.json yarn.lock .yarnrc.yml ./

COPY packages/task-service/package.json ./packages/task-service/package.json
COPY packages/task-service/tsconfig.json ./packages/task-service/tsconfig.json
COPY packages/task-service/src ./packages/task-service/src
COPY libs ./libs
COPY .yarn ./.yarn/

RUN ls -a

RUN yarn install

RUN npm install -g typescript@4.9.5
RUN npm install -g rimraf@3.0.2

RUN yarn tasksvc:build

CMD [ "yarn", "tasksvc:start"]
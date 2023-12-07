FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/ui
WORKDIR /opt/ui


COPY package.json yarn.lock .yarnrc.yml ./

COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/ui/tsconfig.json ./packages/ui/tsconfig.json
COPY packages/ui/src ./packages/ui/src
COPY packages/ui/index.html ./packages/ui/
COPY libs ./libs
COPY .yarn ./.yarn/

RUN ls -a

RUN yarn install

RUN npm install -g typescript@4.9.5

RUN #yarn ui:build

EXPOSE 5173

CMD [ "yarn", "ui:host"]
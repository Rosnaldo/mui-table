FROM node:alpine AS base

ENV NODE_ENV=production
RUN npm i -g pnpm


FROM base as dependencies

WORKDIR '/app'
COPY [ "package.json", "pnpm.lock*", "./" ]
RUN pnpm i


FROM base as build

WORKDIR '/app'
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm i -g @nestjs/cli
RUN pnpm run build
RUN pnpm prune --prod


FROM base as deploy

WORKDIR '/app'
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]

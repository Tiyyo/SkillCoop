FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g pnpm

ENV PNPM_HOME=/app/.pnpm
ENV PATH=$PATH:$PNPM_HOME

FROM base AS dependencies
WORKDIR /app
COPY . .
RUN pnpm install

FROM dependencies AS build
RUN pnpm -r build

FROM build AS pruned
RUN pnpm --filter chat-server deploy pruned
COPY --from=build /app/apps/chat-server/dist ./pruned

FROM base AS development  
WORKDIR /app
COPY --from=pruned /app/pruned .

FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=pruned /app/pruned/dist .
COPY --from=pruned /app/pruned/package.json ./package.json  
COPY --from=dependencies /app/apps/chat-server/prisma/ ./prisma
COPY --from=pruned /app/pruned/node_modules ./node_modules
RUN pnpm exec prisma generate

ENTRYPOINT [ "node", "index.js" ]
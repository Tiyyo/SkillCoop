FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g pnpm
RUN npm install serve -g

ENV PNPM_HOME=/app/.pnpm
ENV PATH=$PATH:$PNPM_HOME

FROM base AS dependencies
WORKDIR /app
COPY . .
RUN pnpm install 

#build all workspace event if not necessary 
FROM dependencies As build
RUN pnpm -r build

#deploy pruned workspace
FROM build AS pruned
RUN pnpm --filter client deploy pruned
COPY --from=build /app/apps/client/dist/ ./pruned/dist

FROM base AS development
WORKDIR /app
COPY --from=pruned /app/pruned .

FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=pruned /app/pruned/dist ./dist
COPY --from=pruned /app/pruned/package.json ./package.json
COPY --from=pruned /app/pruned/node_modules ./node_modules

CMD ["npm" , "run" , "start"]
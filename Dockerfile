FROM node:22-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

COPY package.json pnpm-lock.yaml* ./
RUN rm -rf node_modules && pnpm install --prefer-offline --no-frozen-lockfile

COPY . .

ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=5173
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=100

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

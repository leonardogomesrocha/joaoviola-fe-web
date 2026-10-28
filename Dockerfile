FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:1
WORKDIR /app
COPY --from=build /app/.output ./.output
EXPOSE 8080
ENV HOST=0.0.0.0
ENV PORT=8080
CMD ["bun", ".output/server/index.mjs"]

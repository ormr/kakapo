FROM node:latest as builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN yarn run build
FROM node:latest
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["yarn", "run", "start:prod"]

FROM node:14-alpine AS builder
ENV NODE_ENV production
WORKDIR /web
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install
ADD . .
RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /web/build /usr/share/nginx/html
EXPOSE 80 443

CMD ["/bin/sh", "-c", "while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \'daemon off;\'"]
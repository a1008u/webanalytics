FROM node:12.14-alpine3.10
# カレントディレクトリを app に
WORKDIR /app

COPY ./html /app/html
COPY ./src /app/src 
COPY ./test /app/test
COPY ./webpack /app/webpack
COPY ./package-lock.json /app/package-lock.json
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json

# デフォルトで node が起動するので sh を代わりに起動
CMD ["sh"]
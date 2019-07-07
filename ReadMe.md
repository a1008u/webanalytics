(webpackについて)[https://qiita.com/soarflat/items/28bf799f7e0335b68186]
(uuidについて)[https://www.npmjs.com/package/uuid]


## セットアップについて
```npm
mk webpack.config.mk
npm install webpack --save-dev
npm install webpack-cli --save-dev
export PATH=$PATH:./node_modules/.bin
npm install typescript
npm install --save dotenv
npm install --save-dev ts-loader
npm install --save-dev jest @types/jest
npm install --save-dev @types/dotenv
npm install --save-dev npm-run-all cpx rimraf
npm install --save-dev eslint prettier @typescript-eslint/{eslint-plugin,parser} eslint-config-prettier eslint-plugin-prettier
```

## dockerについて
```
cd ./docker/dev/
docker-compose up --build
```

```
cd ./docker/staging/
docker-compose up --build
```

```
cd ./docker/production/
docker-compose up --build
```

## webpackについて
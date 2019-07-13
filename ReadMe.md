(webpackについて)[https://qiita.com/soarflat/items/28bf799f7e0335b68186]
(uuidについて)[https://www.npmjs.com/package/uuid]


## セットアップについて
```npm
mk webpack.config.mk
npm install webpack --save-dev
npm install webpack-cli --save-dev
export PATH=$PATH:./node_modules/.bin
npm install typescript
npm install --save dotenv fs
npm install --save-dev ts-loader
npm install --save-dev jest @types/jest @types/dotenv-webpack
npm install --save-dev @types/dotenv
npm install --save-dev npm-run-all cpx rimraf
npm install --save-dev eslint prettier @typescript-eslint/{eslint-plugin,parser} eslint-config-prettier eslint-plugin-prettier
npm install --save-dev jest ts-jest @types/jest
npm install --save uuid @types/uuid
npm install --save sha256 @types/sha256
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

--------------------------------------------------------------

## webpackについて
### localhostでGAEを起動した場合
```npm
npm run build_local_dev
```

### GCP上にGAEを起動した場合
```npm
npm run build_dev
```

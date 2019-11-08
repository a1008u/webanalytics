# DatAly(implementor + DatAly)
## 役割
### implementor
認証キーを確認んして、isToolsに登録されている連携情報をもとに外部連携を行う。
基本として、必ずDatAlyとは連携を行う。
このタイミングで、ユーザIDを発行する

### DatAly
読了率や滞在時間を取得するためのScript


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
npm install --save sha1 @types/sha1
npm install --save jest-localstorage-mock
npm install --save-dev jest-fetch-mock
npm install --save es6-promise fetch-polyfill sendbeacon-polyfill
npm install --save webpack-merge exports-loader imports
npm install date-fns date-fns-tz date-fns-timezone --save
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
// mac,linux用
npm run build_local_dev

// windows用
npm run win_build_local_dev
```

### GCP上にGAEを起動した場合
```npm
npm run build_dev
```

--------------------------------------------------------------

## 発行されるタグ
### dev用
```
<script>
    var __atinfo = {
    "Ay":"ここにはaccesskeyが記載されます。",
    "Sd":"ここにサイトIDが記載されます。"
    }
    (function(d){var s=d.createElement('script');s.src='https://s.dev.atdataly.jp/script/atimplementor.min.js';s.async=true;var e=d.getElementsByTagName('script')[0];e.parentNode.insertBefore(s,e);})(document);
</script> 
```

### staging用
```
<script>
    var __atinfo = {
    "Ay":"ここにはaccesskeyが記載されます。",
    "Sd":"ここにサイトIDが記載されます。"
    }
    (function(d){var s=d.createElement('script');s.src='https://s.dev.atdataly.jp/script/atimplementor.min.js';s.async=true;var e=d.getElementsByTagName('script')[0];e.parentNode.insertBefore(s,e);})(document);
</script> 
```

### production用
```
<script>
    var __atinfo = {
    "Ay":"ここにはaccesskeyが記載されます。",
    "Sd":"ここにサイトIDが記載されます。"
    }
    (function(d){var s=d.createElement('script');s.src='../../js/implementorjs/atimplementorjs.min.js';s.async=true;var e=d.getElementsByTagName('script')[0];e.parentNode.insertBefore(s,e);})(document);
</script> 
```

----------------------------------------------------------
## test環境
[site1-1](https://s.dev.atdataly.jp/static/site1/index.html)
[site1-2](https://s.dev.atdataly.jp/static/site1/index2.html)
[site1-gtm](https://s.dev.atdataly.jp/static/site1/index_gtm.html)

[site2-1](https://s.dev.atdataly.jp/static/site2/inde.html)
[site2-2](https://s.dev.atdataly.jp/static/site2/index2.html)
[site2-gtm](https://s.dev.atdataly.jp/static/site2/index_gtm.html)

[site3-1](https://s.dev.atdataly.jp/static/site3/inde.html)
[site3-2](https://s.dev.atdataly.jp/static/site3/index2.html)
[site3-gtm](https://s.dev.atdataly.jp/static/site3/index_gtm.html)

## staging環境
[site1-1](https://s.staging.atdataly.jp/static/site1/inde.html)
[site1-2](https://s.staging.atdataly.jp/static/site1/index2.html)
[site1-gtm](https://s.staging.atdataly.jp/static/site1/index_gtm.html)

[site2-1](https://s.staging.atdataly.jp/static/site2/inde.html)
[site2-2](https://s.staging.atdataly.jp/static/site2/index2.html)
[site2-gtm](https://s.staging.atdataly.jp/static/site2/index_gtm.html)

[site3-1](https://s.staging.atdataly.jp/static/site3/inde.html)
[site3-2](https://s.staging.atdataly.jp/static/site3/index2.html)
[site3-gtm](https://s.staging.atdataly.jp/static/site3/index_gtm.html)

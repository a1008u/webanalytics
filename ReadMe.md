(webpackについて)[https://qiita.com/soarflat/items/28bf799f7e0335b68186]

mk webpack.config.mk
npm install webpack --save-dev
npm install webpack-cli --save-dev
export PATH=$PATH:./node_modules/.bin


npm i --save-dev babel-loader @babel/core @babel/cli @babel/preset-env
npm i --save @babel/polyfill


uuidについて
https://www.npmjs.com/package/uuid


----

# CLI kinesisの使い方

## 1.作成
```
# testと記載している箇所は任意で名前を記載可能。　また、shard数は必須
aws kinesis create-stream --stream-name test --shard-count 1
```

### ストリーム作成の進行状況を確認
```
aws kinesis describe-stream --stream-name test
```

### 新しいストリームの存在を確認する 
```
aws kinesis list-streams
```

## 2.レコードの追加
```
aws kinesis put-record --stream-name test --partition-key 1 --data "{'id':'1', 'temp':'test'}"
``` 

## 3.レコードを取得する
### get-shard-iteratorのIDを取得
```
aws kinesis get-shard-iterator --shard-id shardId-000000000000 --shard-iterator-type TRIM_HORIZON --stream-name test
```

### Recordsの確認
```
aws kinesis get-records --shard-iterator #ここにget-shard-iteratorのIDを貼り付ける
```

#### shellでの例
```
SHARD_ITERATOR=$(aws kinesis get-shard-iterator --shard-id shardId-000000000000 --shard-iterator-type TRIM_HORIZON --stream-name test --query 'ShardIterator')

aws kinesis get-records --shard-iterator $SHARD_ITERATOR
```

(encodeツール)[https://www.base64decode.org/]

## 4.クリーンアップ
最後に、ストリームを削除してリソースを解放する。  
理由：  
アカウントに対する意図しない料金が発生することを回避するため。  
ストリームでデータを入力および取得したかどうかにかかわらず、ストリームごとに料金が発生するためです。
```
aws kinesis delete-stream --stream-name test
aws kinesis describe-stream --stream-name test
```

---



```npm
npm install typescript
npm install --save-dev ts-loader
npm install --save-dev jest @types/jest
npm install --save-dev tslint prettier tslint-plugin-prettier tslint-config-prettier tslint-config-standard
```
import '@babel/polyfill'
import { pixelDepth, clickDepth, closeExec } from "./service/common";
import { changeQuery } from "./service/query";
import { init } from "./service/init";
import { resultjson, scroll } from './domain/resultjson';

async function main(){

  // 再利用変数（画面遷移時とタブがvisibleの時に代入されます。）
  let h: number, clienth: number;
  let resultJson: resultjson;

  // 計測用のJSON最終形態(start、end、scroll、clickは下記で追加する。)
  h = document.documentElement.scrollHeight;  // ドキュメントの高さ
  clienth = document.documentElement.clientHeight;  //高さ
  resultJson = await init(h, clienth);

  // ancher elementのquery書き換え（初期化後の処理）
  changeQuery("localhost:8080","userid", resultJson.user.id)

  // scrollの処理
  window.addEventListener("scroll", async() => {
    const scrollJson: scroll = await pixelDepth()
    if (resultJson.scroll.scrollTop < scrollJson.scrollTop) {
      console.log(" resultJson.scroll = scrollJson", resultJson.scroll, scrollJson)
      resultJson.scroll = scrollJson
    }
  })

  // click時の処理
  window.addEventListener("click", async(e: MouseEvent) => {
    const clickJson = await clickDepth(e);
    resultJson.click.push(clickJson)
    console.log("clickJson ---", clickJson, "resultJson ---",resultJson)
  })

  // タブ移動および画面遷移時の処理
  window.addEventListener("visibilitychange", async () => {
    const visibilityState = document.visibilityState
    if (visibilityState === "hidden") {
      console.log("イベントタイプ", event.type);
      closeExec(resultJson, h);
    }

    if (visibilityState === "visible"){
      console.log("イベントタイプ", event.type);
      h = document.documentElement.scrollHeight;  // ドキュメントの高さ
      clienth = document.documentElement.clientHeight;  //高さ
      resultJson = await init(h, clienth);
    }
  });

}

console.log("datalyの起動です")
main();


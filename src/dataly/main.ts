import { pixelDepth, clickDepth, closeExec } from "./service/common";
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

  // scrollの処理
  window.addEventListener("scroll", async() => {
    const scrollJson: scroll = await pixelDepth()
    // scrollは常に一番深くスクロールした情報を取得する
    if (resultJson.scroll.scrollTop < scrollJson.scrollTop) {
      console.log(" resultJson.scroll = scrollJson", resultJson.scroll, scrollJson)
      resultJson.scroll = scrollJson
    }
  })

  // click時の処理
  window.addEventListener("click", async(e: MouseEvent) => {
    const clickJson = await clickDepth(e);
    console.log("clickJson ---", clickJson, "resultJson ---",resultJson)
    resultJson.click.push(clickJson)
  })

  // タブ移動および画面遷移時の処理
  window.addEventListener("visibilitychange", async() => {
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

main();


import { pixelDepth, closeExec } from "./service/common";
import { init } from "./service/init";
import { resultjson, sl } from "./domain/resultjson";
import { changeQuery } from "./service/query";

async function main(): Promise<void> {
  // 再利用変数（画面遷移時とタブがvisibleの時に代入されます。）
  let h: number, clienth: number;
  let resultJson: resultjson;

  // 計測用のJSON最終形態(user, start、end、scroll)
  h = document.documentElement.scrollHeight; // ドキュメントの高さ
  clienth = document.documentElement.clientHeight; //高さ

  // 初期化
  resultJson = await init(h, clienth);
  changeQuery(process.env.DELIVERYURL, "atud", resultJson);

  // scrollの処理
  document.addEventListener(
    "scroll",
    async (): Promise<void> => {
      const scrollJson: sl = await pixelDepth();
      // scrollは常に一番深くスクロールした情報を取得する
      if (resultJson.sl.sp < scrollJson.sp) {
        // console.log(" resultJson.scroll = scrollJson",resultJson.sl,scrollJson);
        resultJson.sl = scrollJson;
      }
    }
  );

  // click時の処理（今後実装）
  // window.addEventListener("click", async(e: MouseEvent) => {
  //   const clickJson = await clickDepth(e);
  //   console.log("clickJson ---", clickJson, "resultJson ---",resultJson)
  //   resultJson.ck.push(clickJson)
  // })

  // タブ移動および画面遷移時の処理
  document.addEventListener(
    "visibilitychange",
    async (): Promise<void> => {
      const visibilityState = document.visibilityState;
      if (visibilityState === "hidden") {
        // console.log("イベントタイプ", event.type);
        closeExec(resultJson, h);
      }

      if (visibilityState === "visible") {
        // console.log("イベントタイプ", event.type);
        h = document.documentElement.scrollHeight; // ドキュメントの高さ
        clienth = document.documentElement.clientHeight; //高さ
        // 識別子の取得
        resultJson = await init(h, clienth);
        changeQuery(process.env.DELIVERYURL, "atud", resultJson);
      }
    }
  );
}

main();

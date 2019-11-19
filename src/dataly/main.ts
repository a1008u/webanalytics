import { pixelDepth, closeExec } from "./service/common";
import { init } from "./service/init";
import { resultjson, sl } from "./domain/resultjson";
import { changeAnchorQuery } from "./service/query";

/**
 * 読了率チェック用にスクロール量を取得（scrollは常に一番深くスクロールした情報を取得する）
 * @param resultJson
 */
async function scrollCkForReadrate(resultJson: resultjson): Promise<void> {
  const scrollJson: sl = await pixelDepth();
  if (resultJson.sl.sp < scrollJson.sp) {
    resultJson.sl = scrollJson;
  }
}

/**
 * タブ移動および画面遷移時の処理
 * @param resultJson
 * @param h
 * @param clienth
 */
async function screenTransition(
  resultJson: resultjson,
  h: number,
  clienth: number
): Promise<{ resultJson: resultjson; h: number; clienth: number }> {
  const visibilityState = document.visibilityState;
  if (visibilityState === "hidden") {
    // console.log("イベントタイプ", event.type);
    closeExec(resultJson, h);
    return { resultJson, h, clienth };
  }

  if (visibilityState === "visible") {
    // console.log("イベントタイプ", event.type);
    h = document.documentElement.scrollHeight; // ドキュメントの高さ
    clienth = document.documentElement.clientHeight; //高さ
    // 識別子の取得
    resultJson = await init(h, clienth);
    changeAnchorQuery(
      process.env.IDENTIFIERKEY,
      process.env.DELIVERYURL,
      process.env.QUERYKEY,
      resultJson
    );
  }
  return { resultJson, h, clienth };
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  // 再利用変数（画面遷移時とタブがvisibleの時に代入されます。）
  let h: number, clienth: number;
  let resultJson: resultjson;

  // 計測用のJSON最終形態(user, start、end、scroll)
  h = document.documentElement.scrollHeight; // ドキュメントの高さ
  clienth = document.documentElement.clientHeight; //高さ

  // 初期化 + atクエリ処理
  resultJson = await init(h, clienth);
  changeAnchorQuery(
    process.env.IDENTIFIERKEY,
    process.env.DELIVERYURL,
    process.env.QUERYKEY,
    resultJson
  );

  // scrollの処理
  document.addEventListener(
    "scroll",
    async (): Promise<void> => await scrollCkForReadrate(resultJson)
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
      ({ resultJson, h, clienth } = await screenTransition(
        resultJson,
        h,
        clienth
      ));
    }
  );
}

main();
export { main, scrollCkForReadrate, screenTransition };

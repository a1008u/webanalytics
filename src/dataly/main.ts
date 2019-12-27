import { pixelDepth, closeExec } from "./service/common";
import { init } from "./service/init";
import { resultjson, sl } from "./domain/resultjson";
import { changeAnchorQuery } from "./service/query";

/**
 * 読了率チェック用にスクロール量を取得（scrollは常に一番深くスクロールした情報を取得する）
 * @param resultJson
 */
async function scrollCkForReadrate(resultJson: resultjson): Promise<resultjson> {
  const scrollJson: sl = await pixelDepth();
  if (resultJson.sl.sp < scrollJson.sp) {
    resultJson.sl = scrollJson;
  }
  return resultJson;
}

/**
 * タブ移動および画面遷移時の処理
 * @param resultJson
 * @param h
 * @param clienth
 */
async function screenTransition(
  resultJson: resultjson,
): Promise<resultjson> {
  const visibilityState = document.visibilityState;
  // sendBeaconでデータを通知する処理
  if (visibilityState === "hidden") {
    // console.log("イベントタイプ", event.type);
    const h = Math.floor(document.documentElement.scrollHeight); // ドキュメントの高さ
    await closeExec(resultJson, h, 'impression');
    return resultJson;
  }

  // 初期化の処理
  if (visibilityState === "visible") {
    // console.log("イベントタイプ", event.type);
    resultJson = await init();
    changeAnchorQuery(
      process.env.DELIVERYURL,
      process.env.QUERYKEY,
      resultJson
    );
  }
  return resultJson;
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  // 再利用変数（画面遷移時とタブがvisibleの時に代入されます。）
  let resultJson: resultjson;
  let sendIntervalToDatalyTotal: number = 0 ;

  const sendIntervalToDataly: number = 10000

  // 初期化 + atクエリ処理
  resultJson = await init();
  changeAnchorQuery(
    process.env.DELIVERYURL,
    process.env.QUERYKEY,
    resultJson
  );

  // 10分間の間10秒に一回起動して、画面がvisible状態の時にdatalyの情報をサーバに送る
  setInterval(() => {
    if ('visible' === document.visibilityState && 600000 > sendIntervalToDatalyTotal) {
      sendIntervalToDatalyTotal += sendIntervalToDataly
      const h = Math.floor(document.documentElement.scrollHeight); // ドキュメントの高さ
      closeExec(resultJson, h, 'impression');
    }
  }, sendIntervalToDataly)

  // scrollの処理
  document.addEventListener(
    "scroll",
    async (): Promise<void> => {
      resultJson = await scrollCkForReadrate(resultJson)
    }
  );

  // タブ移動および画面遷移時の処理
  document.addEventListener(
    "visibilitychange",
    async (): Promise<void> => {
      sendIntervalToDatalyTotal = 0
      resultJson = await screenTransition(resultJson);
    }
  );
}

// 実際の利用ではこちらのmainを使う
main();

// 開発でdataly.min.jsの実行用
// document.addEventListener('DOMContentLoaded',
//   event => {
//     main();
//   },
//   false
// );

export { main, scrollCkForReadrate, screenTransition };

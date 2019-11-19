import { sl, resultjson, ed } from "../domain/resultjson";
import { utcToZonedTime, format } from "date-fns-tz";

// 作業時間を作成
// 戻り値 [ゾーン, ゾーンから推測したlocalの時間, UTCの時間, JSTの時間]
function mkDateTime(): string[] {
  const DataAyformat = "Y-MM-dd HH:mm:ss.SSS";
  const nowDate = new Date();

  // timeZone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : null;

  // local
  const dateFLOCAL = format(nowDate, DataAyformat);

  // UTC
  const utcDate = utcToZonedTime(nowDate, "UTC");
  const dateFUTC = format(utcDate, DataAyformat);

  // 日本時間
  const timeZones = "Asia/Tokyo";
  const zonedDate = utcToZonedTime(nowDate, timeZones);
  const dateFJST = format(zonedDate, DataAyformat);

  return [timeZone, dateFLOCAL, dateFUTC, dateFJST];
}

/**
 * スクロール時の処理（小数点は全て切り捨て）
 * @return {void}
 */
async function pixelDepth(): Promise<sl> {
  const scrollJson: sl = new sl(
    Math.floor(document.documentElement.clientHeight),
    Math.floor(document.documentElement.scrollHeight),
    Math.floor(document.documentElement.scrollTop)
  );
  return scrollJson;
}

// click位置の測定
// async function clickDepth(e: MouseEvent): Promise<ck> {
//   const X: number = e.pageX; //X座標
//   const Y: number  = e.pageY; //Y座標
//   return new ck(X, Y);
// }

/**
 * 認証が有効な場合、gaeにdatalyのデータを転送する。
 * @param resultJson
 * @param h
 */
async function closeExec(resultJson: resultjson, h: number): Promise<void> {
  // console.log("イベントタイプ--------------------", event.type);
  const [_, enddateLocal, enddateUtc, enddateJst] = await mkDateTime();
  const endJson: ed = new ed(enddateLocal, enddateUtc, enddateJst, h);
  resultJson.ed = endJson;
  // console.log("endに格納するJSON", endJson, "計測用のJSON最終形態", resultJson);

  const DATALYACCESSURL: string = process.env.DATALYACCESSURL;
  if ("sendBeacon" in navigator) {
    navigator.sendBeacon(DATALYACCESSURL, JSON.stringify(resultJson));
  } else {
    const rq = new XMLHttpRequest();
    rq.open("POST", DATALYACCESSURL, false);
    rq.send(JSON.stringify(resultJson));
  }
}

export { mkDateTime, pixelDepth, closeExec };

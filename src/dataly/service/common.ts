import { sl, resultjson, ed } from "../domain/resultjson";
import * as moment from 'moment';
import momentz from 'moment-timezone';

// 作業時間を作成
// 戻り値 [ゾーン, ゾーンから推測したlocalの時間, UTCの時間, JSTの時間]
function mkDateTime(): Array<string> {
  const format: string = 'Y-MM-DD HH:mm:ss.SSS'
  const dateUtc = moment.utc();
  const dateGuess = momentz.tz(dateUtc, momentz.tz.guess());
  const dateJst = momentz.tz(dateUtc, "Asia/Tokyo");
  const dateFUTC = dateUtc.format(format);
  const dateFGUESS = dateGuess.format(format);
  const dateFJST = dateJst.format(format);
  return [momentz.tz.guess(), dateFGUESS, dateFUTC, dateFJST];
}

/**
 * スクロール時の処理
 *
 *  // console.log('サーバに送信しないよ')
    // console.log("--------------------")
    // console.log(
    // `スクロールした回数:${scrollCount}`
    // ,`読了率:${Math.round(((scrollTop+Number(clienth))/h)*100)}%`
    // , `${startmessage}:${scrolldateJst}`
    // , `トップからのスクロール位置:${scrollTop}`
    // , `ドキュメントの全体の高さ${h}`
    // , `画面表示の高さ${clienth}`
    // , `見えていない高さ${Number(h)-Number(clienth)}`)
 * @return {void}
 */
async function pixelDepth(): Promise<sl> {
  const scrollJson: sl = new sl(
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.scrollTop
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

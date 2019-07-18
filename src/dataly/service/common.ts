import { ck, sl, resultjson, ed } from "../domain/resultjson";

// 作業時間を作成
function mkDateTime () : string {
  const date = new Date();
  const dateJST: string = date.getFullYear()
  + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '-' + ('0' + date.getDate()).slice(-2)
  + ' ' + ('0' + date.getHours()).slice(-2)
  + ':' + ('0' + date.getMinutes()).slice(-2)
  + ':' + ('0' + date.getSeconds()).slice(-2)
  + '.' + ('0' + date.getMilliseconds()).slice(-3);
  return dateJST
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
  return scrollJson
}

// click位置の測定
async function clickDepth(e: MouseEvent): Promise<ck> {
  const X: number = e.pageX; //X座標
  const Y: number  = e.pageY; //Y座標
  return new ck(X, Y);
}

/**
 * 認証が有効な場合、gaeにdatalyのデータを転送する。
 * @param resultJson 
 * @param h 
 */
async function closeExec(resultJson: resultjson, h: number, ) {
  console.log("イベントタイプ--------------------", event.type);
  const enddateJst: string = await mkDateTime();
  const endJson: ed = new ed(enddateJst, h)
  resultJson.ed = endJson;
  console.log('endに格納するJSON', endJson, '計測用のJSON最終形態', resultJson);

  const DATALYACCESSURL: string = process.env.DATALYACCESSURL
  if ("sendBeacon" in navigator) {
    navigator.sendBeacon(DATALYACCESSURL, JSON.stringify(resultJson));
  } else {
    const rq = new XMLHttpRequest();
    rq.open("POST", DATALYACCESSURL, false);
    rq.send(JSON.stringify(resultJson));
  }
}


export {mkDateTime, pixelDepth, clickDepth, closeExec}
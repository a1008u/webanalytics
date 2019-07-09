import { getLocalStorage, storeInLocalStorage} from "./localstorage";
import { getQueryTargetKeyValue } from "./query";
import { click, scroll, resultjson, end } from "../domain/resultjson";
import uuidv4 = require('uuid/v4');

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
async function pixelDepth(): Promise<scroll> {
    const scrollJson: scroll = new scroll(
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.scrollTop
    );
    console.log("--------------------", scrollJson)
    return scrollJson
}

// click位置の測定
async function clickDepth(e: MouseEvent): Promise<click> {
  const X: number = e.pageX; //X座標
  const Y: number  = e.pageY; //Y座標
  return new click(X, Y);
}

/**
 * Uid(user ID)の所得順序
 * 1.localstorageから取得
 * 2.クエリーパラメータから取得
 * 3.uuidv4を利用して、生成
 * 
 * @param uidKey
 */
async function getUid(uidKey: string) : Promise<string>{

  // localstorageck
  const atuid: string|null = getLocalStorage(uidKey)
  if(atuid){
    console.log("local storageから取得 : ", atuid)
    return atuid;
  }

  // paramck
  const queryUid: string|null = getQueryTargetKeyValue(location.search.substring(1), "userid=")
  if(queryUid){
    console.log("paramから取得 : ", queryUid)
    storeInLocalStorage(queryUid)
    return queryUid;
  }

  const uuid = uuidv4()
  console.log("uuidv4()から取得 : ", uuid)
  storeInLocalStorage(uuid)
  return uuid
}

/**
 * 認証が有効な場合、gaeにdatalyのデータを転送する。
 * @param resultJson 
 * @param h 
 */
async function closeExec(resultJson: resultjson, h: number, ) {
  console.log("イベントタイプ--------------------", event.type);
  const enddateJst: string = await mkDateTime();
  const endJson: end = new end(enddateJst, h)
  resultJson.end = endJson;
  console.log('endに格納するJSON', endJson, '計測用のJSON最終形態', resultJson);

  console.log("----------------");
  console.log(resultJson);
  console.log("----------------");

  const DATALYACCESSURL: string = process.env.DATALYACCESSURL
  if ("sendBeacon" in navigator) {
    navigator.sendBeacon(DATALYACCESSURL, JSON.stringify(resultJson));
  } else {
    const rq = new XMLHttpRequest();
    rq.open("POST", DATALYACCESSURL, false);
    rq.send(JSON.stringify(resultJson));
  }
}


export {mkDateTime, pixelDepth, clickDepth, getUid, closeExec}
import { getLocalStorage, storeInLocalStorage} from "./localstorage";
import { getQueryTargetKeyValue } from "./query";
import { getCookie } from "./cookie";
const uuidv4 = require('uuid/v4');

// 作業時間を作成
async function mkDateTime () {
  const date = new Date();
  const dateJST = date.getFullYear()
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
 * @return {void}
 */
async function pixelDepth(clienth, h){
    const scroll = {
      "documentheight": document.documentElement.scrollHeight,
      "scrollTop": document.documentElement.scrollTop,
      "clientHeight": document.documentElement.clientHeight
    };
    
    console.log("--------------------", scroll)
    // console.log('サーバに送信しないよ')
    // console.log("--------------------")
    // console.log(
    // `スクロールした回数:${scrollCount}`
    // ,`読了率:${Math.round(((scrollTop+Number(clienth))/h)*100)}%`
    // , `${startmessage}:${scrolldateJst}`
    // , `トップからのスクロール位置:${scrollTop}`
    // , `ドキュメントの全体の高さ${h}`
    // , `画面表示の高さ${clienth}`
    // , `見えていない高さ${Number(h)-Number(clienth)}`)
  
    // console.log("--------------------")
    // console.log('サーバに送信する情報2')
    // console.log("--------------------")
  
    return scroll
}

// click位置の測定
async function clickDepth(e) {
  const mX = e.pageX; //X座標
  const mY = e.pageY; //Y座標
  const clickJson = {
    "x": mX,
    "y": mY
  };
  return clickJson;
}

// userIdの取得
async function getUid(uidKey) {

  // localstorageck
  const atuid = getLocalStorage("_atuid")
  if(atuid){
    console.log("local storageから取得 : ", atuid)
    return atuid;
  }

  // paramck
  const queryUid = getQueryTargetKeyValue(location.search.substring(1), "userid=")
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

async function getPageno(cookieKey, paramKey){
  const cookiePageno = await getCookie(cookieKey)
  if (cookiePageno) {
    console.log("cookieからの取得 ", String(Number(cookiePageno) + 1))
    return String(Number(cookiePageno) + 1)
  } else {
    const pageNo = getQueryTargetKeyValue(location.search.substring(1), paramKey)
    if (pageNo) {
      console.log("paramからの取得 ", String(Number(pageNo) + 1))
      return String(Number(pageNo) + 1)
    } else {
      console.log("初回からの取得 ", 1)
      return "1"
    }
  }
}

async function closeExec(resultJson, h) {
  console.log("イベントタイプ--------------------", event.type);
  const enddateJst = await mkDateTime();
  const endJson = {
    "datetime": enddateJst,
    "documentheight": h
  };
  resultJson.end = endJson;
  console.log('endに格納するJSON', endJson, '計測用のJSON最終形態', resultJson);
  const localUrl = "http://127.0.0.1:8080/json";
  const gaeurl = "https://rugged-baton-234609.appspot.com/json";
  // const gaeurl = "https://ck-how-2-use.appspot.com/json"
  if ("sendBeacon" in navigator) {
    navigator.sendBeacon(gaeurl, JSON.stringify(resultJson));
  }
  else {
    const rq = new XMLHttpRequest();
    rq.open("POST", gaeurl, false);
    rq.send(resultJson);
  }
}


export {mkDateTime, pixelDepth, clickDepth, getUid, getPageno, closeExec}
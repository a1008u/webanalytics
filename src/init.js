import { mkDateTime, pixelDepth, getUid} from "./common";
import { storeInCookie} from "./cookie";

// 初期化
async function init(resultJson, h, clienth, func){

  const uidKey = "_atuid";

  const uuid = await getUid(uidKey)
  const url = location.href ;
  const ua = window.navigator.userAgent.toLowerCase();
  const referrer = document.referrer

  // scroll初期化
  resultJson.scroll = await pixelDepth(clienth, h)

  // click初期化
  resultJson.click = []

  // js起動時間の確認
  const startdateJst = await mkDateTime('起動時間')

  // 1.アクセスした時間を作成し、計測用のJSON最終形態のstartに追加
  // user初期化
  const userJson = {
    "id":uuid
    ,"url":url
    ,"referrer":referrer
    ,"ua":ua
    // ,"pageno": await func("_atpno", "atpno=")
  }
  resultJson.user = userJson
  // storeInCookie(resultJson.user.pageno)

  // startJson初期化
  const startJson = {
    "datetime":startdateJst
    ,"scrollTop":0
    ,"documentheight":h
    ,"clientheight":clienth
  }
  resultJson.start = startJson
}

export {init}
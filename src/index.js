import '@babel/polyfill'
import { mkDateTime, pixelDepth, clickDepth, getUid } from "./common";
import { changeQuery, deleteQuery } from "./query";
import { getQueryTargetKeyValue } from "./query";

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

// 初期化
async function init(resultJson, h, clienth){

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
  }
  resultJson.user = userJson

  // startJson初期化
  const startJson = {
    "datetime":startdateJst
    ,"scrollTop":0
    ,"documentheight":h
    ,"clientheight":clienth
  }
  resultJson.start = startJson
}

async function main(){
  
  // 再利用変数（画面遷移時とタブがvisibleの時に代入されます。）
  let h, clienth;

  // 計測用のJSON最終形態(start、end、scroll、clickは下記で追加する。)
  h = document.documentElement.scrollHeight;  // ドキュメントの高さ
  clienth = document.documentElement.clientHeight;  //高さ
  let resultJson = {}
  resultJson.start = await init(resultJson, h, clienth);
  console.log('計測用のJSON最終形態',resultJson)

  // ページ遷移番号
  const pageNo = getQueryTargetKeyValue(location.search.substring(1), "atpno=")
  if (pageNo) {
    resultJson.pageno = String(Number(pageNo) + 1)
  } else {
    resultJson.pageno = "1"
  }
  console.log("pageNo : ",resultJson.pageno)
  // ancher elementのquery書き換え
  changeQuery("index2","userid", resultJson.user.id)
  changeQuery("index2","atpno", resultJson.pageno)


  // 画面遷移時の処理
  // window.addEventListener("unload", async (e) => {
  //   closeExec(resultJson, h);
  // }, false);

  // scrollの処理
  window.addEventListener("scroll", async() => {
    let scrollJson = await pixelDepth(clienth, h)
    if (resultJson.scroll.scrollTop < scrollJson.scrollTop) {
      console.log(" resultJson.scroll = scrollJson", resultJson.scroll, scrollJson)
      resultJson.scroll = scrollJson
    }
  })

  // click時の処理
  window.addEventListener("click", async(e) => {
    const clickJson = await clickDepth(e);
    resultJson.click.push(clickJson)
    console.log("clickJson ---", clickJson, "resultJson ---",resultJson)
  })

  // タブ移動および画面遷移時の処理
  window.addEventListener("visibilitychange", async () => {
    const visibilityState = document.visibilityState
    if (visibilityState === "hidden") {
      console.log("イベントタイプ", event.type);
      closeExec(resultJson, h);
    }

    if (visibilityState === "visible"){
      console.log("イベントタイプ", event.type);
      h = document.documentElement.scrollHeight;  // ドキュメントの高さ
      clienth = document.documentElement.clientHeight;  //高さ
      let resultJson = {}
      resultJson.start = await init(resultJson, h, clienth);
      resultJson.pageno = "1"

      // ancher elementのquery書き換え
      deleteQuery("index2","atpno")
      changeQuery("index2","atpno", resultJson.pageno)
    }
  });
}

main()
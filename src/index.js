import '@babel/polyfill'
import { mkDateTime, pixelDepth, clickDepth } from "./common";
const uuidv4 = require('uuid/v4');


const uuid = uuidv4();
const h = document.documentElement.scrollHeight;  // ドキュメントの高さ
const clienth = document.documentElement.clientHeight;  //高さ
const url = location.href ;
const ua = window.navigator.userAgent.toLowerCase();
const referrer = document.referrer

// 計測用のJSON最終形態(start、end、scroll、clickは下記で追加する。)
const resultJson = {}

// js起動時間の確認
console.log("--------------------")
const [startmessage, startdateJst, startdate] = mkDateTime('起動時間')
console.log(startmessage, startdateJst)
console.log("--------------------")

// 1.アクセスした時間を作成し、計測用のJSON最終形態のstartに追加
console.log("--------------------")
console.log('サーバに送信する情報1(ページにアクセスしたタイミング)')
console.log("--------------------")
const userJson ={
  "id":uuid
  ,"url":url
  ,"referrer":referrer
  ,"ua":ua
}
resultJson.user = userJson

const startJson = {
  "datetime":startdateJst
  ,"scrollTop":0
  ,"documentheight":h
  ,"clientheight":clienth
}
resultJson.start = startJson
console.log('startに格納するJSON',startJson,'計測用のJSON最終形態',resultJson)
console.log("--------------------")


// 画面遷移時の処理
window.addEventListener("unload", async (e) => {
  console.log("--------------------")
  const [endmessage, enddateJst, enddate] = mkDateTime('終了時間')
  console.log(endmessage, enddateJst)
  console.log("--------------------")

  console.log("--------------------")
  console.log('サーバに送信する情報3')
  console.log("--------------------")

  const endJson = {
    "datetime":enddateJst
    ,"documentheight":h
  }
  resultJson.end = endJson;
  console.log('endに格納するJSON',endJson,'計測用のJSON最終形態',resultJson)

  const localUrl = "http://127.0.0.1:8080/json"
  const gaeurl = "https://rugged-baton-234609.appspot.com/json"
  if("sendBeacon" in navigator) {
      navigator.sendBeacon(gaeurl, JSON.stringify(resultJson));
    }else{
      const rq = new XMLHttpRequest();
      rq.open("POST",  gaeurl, false);
      rq.send(resultJson);
    }
}, false);



// scrollの処理
let scrollCount =　0
window.addEventListener("scroll", async() => {

  let scrollJson = await pixelDepth(++scrollCount, clienth, h)

  if (resultJson.scroll === undefined) {
    // 初回用
    resultJson.scroll = scrollJson
  } else {
    console.log("resultJson.scroll.scrollTop --- ", resultJson.scroll.scrollTop)
    console.log("scrollJson.scrollTop --- ", scrollJson.scrollTop)
    if (resultJson.scroll.scrollTop < scrollJson.scrollTop) {
      resultJson.scroll = scrollJson
    } 
  }
})



// click時の処理
resultJson.click = []
window.addEventListener("click", async(e) => {
  const clickJson = await clickDepth(e);
  resultJson.click.push(clickJson)
  console.log("clickJson ---", clickJson, "resultJson ---",resultJson)
})

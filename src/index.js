import '@babel/polyfill'
import { uploadJson } from "./upload";
import axios from "axios";
import { mkDateTime, pixelDepth, clickDepth } from "./common";
const uuidv4 = require('uuid/v4');


const uuid = uuidv4();
const h = document.documentElement.scrollHeight;  // ドキュメントの高さ
const clienth = document.documentElement.clientHeight;  //高さ
const url = location.href ;
const ua = window.navigator.userAgent.toLowerCase();
const x = 'ここにサイト情報など'
const referrer = document.referrer

// 計測用のJSON最終形態
const resultJson = {start:[],scroll:0,click:[],end:[]}

// js起動時間の確認
console.log("--------------------")
const [startmessage, startdateJst, startdate] = mkDateTime('起動時間')
console.log(startmessage, startdateJst)
console.log("--------------------")

// 1.アクセスした時間を作成し、計測用のJSON最終形態のstartに追加
console.log("--------------------")
console.log('サーバに送信する情報1(ページにアクセスしたタイミング)')
console.log("--------------------")
let startJson = {
  id:uuid
  ,url:url
  ,referrer:referrer
  ,ua:ua
  ,startdatetime:startdateJst
  ,enddatetime:""
  ,scroll:0
  ,documentheight:h
  ,clientheight:clienth
  // ,ex:x
}
resultJson.start.push(startJson)
console.log('startに格納するJSON',startJson,'計測用のJSON最終形態',resultJson)
console.log("--------------------")

// 画面遷移時の処理
window.addEventListener("unload", async (e) => {
  console.log("--------------------")
  const [endmessage, enddateJst, enddate] = mkDateTime('終了時間')
  console.log(endmessage, enddateJst)
  console.log("--------------------")

  let scrollTop = document.documentElement.scrollTop

  console.log("--------------------")
  console.log('サーバに送信する情報3')
  console.log("--------------------")

  let endJson = {
    "enddatetime":enddateJst
    ,"documentheight":h
    ,"clientheight":clienth
  }
  resultJson.end.push(endJson)
  console.log('endに格納するJSON',endJson,'計測用のJSON最終形態',resultJson)

  // S3へのアップロード
  // uploadFile(resultJson)

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
  const scrollTop = await pixelDepth(++scrollCount, clienth, h)
  if (resultJson.scroll < scrollTop) {
    console.log("resultJson.scroll --- ", resultJson.scroll)
    console.log("scrollTop --- ", scrollTop)
    resultJson.scroll = scrollTop
  } 
})



// click時の処理
window.addEventListener("click", async(e) => {
  const clickJson = await clickDepth(e);
  resultJson.click.push(clickJson)
  console.log("clickJson ---", clickJson, "resultJson ---",resultJson)
})




// let greatestScrollTop = 0
// let settings = Object.assign({
//   throttle              : 250,
//   minHeight             : 0,
//   scrollElement         : document.documentElement,
//   percentages           : [0.25, 0.5, 0.75, 0.9, 0.95, 0.99],
//   pixelDepthInterval    : 500,
//   elements              : [],
//   dataLayer             : window.dataLayer,
//   trackerName           : '',
//   eventName             : 'CustomEvent',
//   eventCategory         : 'Scroll Depth',
//   percentageDepthAction : 'Percentage Depth',
//   pixelDepthAction      : 'Pixel Depth',
//   elementAction         : 'Element Depth',
//   nonInteraction        : true,
// }, settings)


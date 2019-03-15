import '@babel/polyfill'
import { uploadFile } from "./test";
const uuidv4 = require('uuid/v4');

const mkDateTime = (message) => {
  const date = new Date();
  const dateJST = date.getFullYear()
  + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '/' + ('0' + date.getDate()).slice(-2)
  + ' ' + ('0' + date.getHours()).slice(-2)
  + ':' + ('0' + date.getMinutes()).slice(-2)
  + ':' + ('0' + date.getSeconds()).slice(-2)
  + ':' + ('0' + date.getMilliseconds()).slice(-3);
  return [message, dateJST, date]
}

/**
 * Push an event when the user has scrolled past each pixelDepthInterval
 * @return {void}
 */
const pixelDepth=(message, dateJst)=> {

  const [startmessage, scrolldateJst, startdate] = mkDateTime('スクロールたいみんぐ')
  let scrollTop = document.documentElement.scrollTop
  
  console.log("--------------------")
  console.log('サーバに送信しないよ')
  console.log("--------------------")
  console.log(
  `スクロールした回数:${scrollCount}`
  ,`読了率:${Math.round(((scrollTop+Number(clienth))/h)*100)}%`
  , `${message}:${dateJst}`
  , `トップからのスクロール位置:${scrollTop}`
  , `ドキュメントの全体の高さ${h}`
  , `画面表示の高さ${clienth}`
  , `見えていない高さ${Number(h)-Number(clienth)}`)

  console.log("--------------------")
  console.log('サーバに送信する情報2')
  console.log("--------------------")
  let scrollJson = {
    "id":uuid
    ,"scrolldatetime":scrolldateJst
    ,"scroll":scrollTop
    ,"documentheight":h
    ,"clientheight":clienth
    ,"ex":x
  }

  console.log(scrollJson)
  resultJson.scroll.push(scrollJson)

  // while (scrollTop >= greatestScrollTop + 500) {
  //   greatestScrollTop += settings.pixelDepthInterval
  //   send({
  //     event          : settings.eventName,
  //     eventCategory  : settings.eventCategory,
  //     eventAction    : settings.pixelDepthAction,
  //     eventLabel     : greatestScrollTop + settings.pixelDepthInterval,
  //     eventValue     : null,
  //     nonInteraction : settings.nonInteraction,
  //   })
  // }
}

const uuid = uuidv4();
const h = document.documentElement.scrollHeight;  // ドキュメントの高さ
const clienth = document.documentElement.clientHeight;  //高さ
const url = location.href ;
const ua = window.navigator.userAgent.toLowerCase();
const x = 'ここにサイト情報など'
const referrer = document.referrer

const resultJson = {start:[],scroll:[],click:[],end:[]}

console.log("--------------------")
const [startmessage, startdateJst, startdate] = mkDateTime('起動時間')
console.log(startmessage, startdateJst)
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
  ,ex:x
}
console.log(startJson)
resultJson.start.push(startJson)
console.log(resultJson)
console.log("--------------------")

// 画面遷移時の処理
window.addEventListener("beforeunload",(e) => {
  console.log("--------------------")
  const [endmessage, enddateJst, enddate] = mkDateTime('終了時間')
  console.log(endmessage, enddateJst)
  console.log("--------------------")

  let scrollTop = document.documentElement.scrollTop

  console.log("--------------------")
  console.log('サーバに送信する情報3')
  console.log("--------------------")

  let endJson = {
    "id":uuid
    ,"url":url
    ,"referrer":referrer
    ,"ua":ua
    ,"startdatetime":startdateJst
    ,"enddatetime":enddateJst
    ,"scroll":scrollTop
    ,"documentheight":h
    ,"clientheight":clienth
    ,"ex":x
  }
  console.log(endJson)
  resultJson.end.push(endJson)

  uploadFile(resultJson)
  let confirmMessage = '離脱するの？';
  e.returnValue = confirmMessage;
  return confirmMessage;
}, false);


// スクロール時の処理
let scrollCount =0
window.addEventListener("scroll",() => {
  scrollCount++
  const [message, dateJst, enddate] = mkDateTime('スクロールしたよ')
  pixelDepth(message, dateJst)
})

let mX;
let mY;
window.addEventListener("click",(e)=>{
  const [startmessage, clickdateJst, startdate] = mkDateTime('クリックしたタイミング')
  mX = e.pageX;  //X座標
  mY = e.pageY;  //Y座標
  let scrollTop = document.documentElement.scrollTop

  let clickJson = {
    "id":uuid
    ,"clickdatetime":clickdateJst
    ,"scroll":scrollTop
    ,"x":mX
    ,"y":mY
    ,"ex":x
  }
  resultJson.click.push(clickJson)
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


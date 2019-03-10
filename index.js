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

const generateUuid = ()=> {
  let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
          case "x":
              chars[i] = Math.floor(Math.random() * 16).toString(16);
              break;
          case "y":
              chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
              break;
      }
  }
  return chars.join("");
}

/**
 * Push an event when the user has scrolled past each pixelDepthInterval
 * @return {void}
 */
const pixelDepth=(message, dateJst)=> {
  const scrollTop = document.documentElement.scrollTop
  console.log(
  `id:${uuid}`
  , `スクロールした回数:${scrollCount}`
  ,`読了率:${Math.round(((scrollTop+Number(clienth))/h)*100)}%`
  , `${message}:${dateJst}`
  , `トップからのスクロール位置:${scrollTop}`
  , `ドキュメントの全体の高さ${h}`
  , `画面表示の高さ${clienth}`
  , `見えていない高さ${Number(h)-Number(clienth)}`)


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

const uuid = generateUuid()
const h = document.documentElement.scrollHeight;  // ドキュメントの高さ
const clienth = document.documentElement.clientHeight;  //高さ

console.log("--------------------")
const [message, startdateJst, startdate] = mkDateTime('起動時間')
console.log("ドキュメントの全体の高さ",h, "画面表示の高さ", clienth, "見えていない高さ", Number(h)-Number(clienth))
console.log(message, startdateJst)
console.log("--------------------")

// 画面遷移時の処理
window.addEventListener("beforeunload",(e) => {
  console.log("--------------------")
  const [endmessage, enddateJst, enddate] = mkDateTime('終了時間')
  console.log(endmessage, enddateJst)
  console.log("--------------------")

  console.log("ドキュメントの全体の高さ",h, "画面表示の高さ", clienth, "見えていない高さ", Number(h)-Number(clienth))
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
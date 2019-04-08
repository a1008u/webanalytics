// 作業時間を作成
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
 * スクロール時の処理
 * @return {void}
 */
async function pixelDepth(scrollCount, clienth, h){

    const [startmessage, scrolldateJst, startdate] = mkDateTime('スクロールたいみんぐ')
    let scrollTop = document.documentElement.scrollTop
    
    console.log("--------------------")
    console.log('サーバに送信しないよ')
    console.log("--------------------")
    console.log(
    `スクロールした回数:${scrollCount}`
    ,`読了率:${Math.round(((scrollTop+Number(clienth))/h)*100)}%`
    , `${startmessage}:${scrolldateJst}`
    , `トップからのスクロール位置:${scrollTop}`
    , `ドキュメントの全体の高さ${h}`
    , `画面表示の高さ${clienth}`
    , `見えていない高さ${Number(h)-Number(clienth)}`)
  
    console.log("--------------------")
    console.log('サーバに送信する情報2')
    console.log("--------------------")
    let scrollJson = {
      // "id":uuid,
      "scrolldatetime":scrolldateJst
      ,"scroll":scrollTop
      ,"documentheight":h
      ,"clientheight":clienth
      // ,"ex":x
    }

    // return scrollJson
  
    return scrollTop

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

// click位置の測定
async function clickDepth(e) {
    const [startmessage, clickdateJst, startdate] = mkDateTime('クリックしたタイミング');
    let mX = e.pageX; //X座標
    let mY = e.pageY; //Y座標
    let scrollTop = document.documentElement.scrollTop;
    let clickJson = {
      // "id":uuid,
      "clickdatetime": clickdateJst,
      "scroll": scrollTop,
      "x": mX,
      "y": mY
      // ,"ex":x
    };
    return clickJson;
  }

  export {mkDateTime, pixelDepth, clickDepth}
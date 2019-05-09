import '@babel/polyfill'
import { pixelDepth, clickDepth, getPageno, closeExec, getVisiblePageno} from "./common";
import { changeQuery, deleteQuery } from "./query";
import { init } from "./init";



async function main(){
  // 再利用変数（画面遷移時とタブがvisibleの時に代入されます。）
  let h, clienth;

  // 計測用のJSON最終形態(start、end、scroll、clickは下記で追加する。)
  h = document.documentElement.scrollHeight;  // ドキュメントの高さ
  clienth = document.documentElement.clientHeight;  //高さ
  let resultJson = {}
  await init(resultJson, h, clienth, getPageno);
  console.log('計測用のJSON最終形態', resultJson)

  // ページ遷移番号
  // resultJson.pageno = await getPageno("_atpno", "atpno=")
  // console.log("pageNo : ",resultJson.pageno)

  // ancher elementのquery書き換え（初期化後の処理）
  changeQuery("index2","userid", resultJson.user.id)
  // changeQuery("index2","atpno", resultJson.pageno)
  
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

  // window.addEventListener('focusout', (event) => {
  //   console.log("focusout --- ", event) 
  // });

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
      await init(resultJson, h, clienth, getVisiblePageno);

      // ancher elementのquery書き換え
      // await deleteQuery("index2","atpno")
      // await changeQuery("index2","atpno", resultJson.pageno)
    }
  });
}

main()
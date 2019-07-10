import { mkDateTime, pixelDepth} from "./common"
import { user, partner, scroll, start, resultjson, click } from "../domain/resultjson";
import { getLocalStorage } from "../../common/localstorage";


/**
 * 初期化
 * resultjsonに初期で登録しなければいけない情報を追加
 * 1.user - 
 * 2.partner -
 * 3.scroll - 
 * 4.start - 
 * 5.end - 
 * 6.click - 
 * 
 */
async function init(h: number, clienth: number) : Promise<resultjson> {

  // 1.アクセスした時間を作成し、計測用のJSON最終形態のstartに追加
  // user初期化
  const uidKey: string= "_atuid";
  const uuid: string = await getLocalStorage(uidKey)
  const url = location.href
  const referrer = document.referrer
  const ua = window.navigator.userAgent.toLowerCase();
  const userJson: user = new user(uuid, referrer, url, ua)

  // パートナーサイトIDの設定
  const datalyElement: HTMLElement = document.getElementById("__at_dataly")
  const pSiteId: string = datalyElement.getAttribute("__atsiteid")
  const pTitle: string = document.title;
  const partnerJson: partner = new partner(pSiteId, pTitle);

  // scroll初期化
  const scrolljson: scroll = await pixelDepth()

  // startJson初期化
  // js起動時間の確認
  const startdateJst = await mkDateTime()
  const scrollTop: number = document.documentElement.scrollTop
  const startjson: start = new start(clienth, startdateJst, h, scrollTop)

  return new resultjson(
    userJson,
    partnerJson,
    scrolljson,
    startjson,
    null,
    new Array<click>()
  )
}

export {init}
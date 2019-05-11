import { mkDateTime, pixelDepth, getUid} from "./common"
import { user, scroll, start, resultjson, click } from "../domain/resultjson";


// 初期化
async function init(h: number, clienth: number) : Promise<resultjson> {

  // 1.アクセスした時間を作成し、計測用のJSON最終形態のstartに追加
  // user初期化
  const uidKey: string= "_atuid";
  const uuid = await getUid(uidKey)
  const url = location.href
  const referrer = document.referrer
  const ua = window.navigator.userAgent.toLowerCase();
  const userjson: user = new user(uuid, url, referrer, ua)

  // scroll初期化
  const scrolljson: scroll = await pixelDepth()

  // startJson初期化
  // js起動時間の確認
  const startdateJst = await mkDateTime()
  const scrollTop: number = document.documentElement.scrollTop
  const startjson: start = new start(clienth, startdateJst, h, scrollTop)

  return new resultjson(
    userjson,
    scrolljson,
    startjson,
    null,
    new Array<click>()
  )
}

export {init}
import { mkDateTime, pixelDepth } from "./common";
import { ur, pr, sl, st, resultjson, sd } from "../domain/resultjson";
import { getLocalStorage } from "../../common/localstorage";
import { mkUid } from "../../common/userid";

/**
 * [初期化]resultjsonに初期で登録しなければいけない情報を追加
 * @param h
 * @param clienth
 */
async function init(): Promise<resultjson> {
  // js起動時間とゾーンをローカルを基準として取得
  const [
    dateZone,
    startdateLocal,
    startdateUtc,
    startdateJst
  ] = await mkDateTime();

  // user初期化
  const ad: string = await getLocalStorage(process.env.LOCALSTORAGEKEY);
  const cd: string = await mkUid();
  const url = location.href;
  const referrer = document.referrer;
  const ua = window.navigator.userAgent;
  const userJson: ur = new ur(
    ad,
    cd,
    0,
    referrer,
    url,
    ua,
    null,
    dateZone,
    null,
    null
  );

  // パートナーサイト初期化
  const datalyElement: HTMLElement = document.getElementById("__at_dataly");
  const pSiteId: string = datalyElement.getAttribute("__dsd");
  const pTitle: string = document.title;
  const partnerJson: pr = new pr(pSiteId, pTitle);

  // scroll初期化
  const scrolljson: sl = await pixelDepth();

  // startJson初期化
  const h = Math.floor(document.documentElement.scrollHeight); // ドキュメントの高さ
  const clienth = Math.floor(document.documentElement.clientHeight); //高さ
  const scrollTop: number = Math.floor(document.documentElement.scrollTop);
  const startjson: st = new st(
    clienth,
    startdateLocal,
    startdateUtc,
    startdateJst,
    h,
    scrollTop
  );

  // send dataの初期化
  const sendData:sd = new sd(null)

  // 終了以外の情報でオブジェクト生成
  return new resultjson(userJson, partnerJson, scrolljson, startjson, null, sendData);
}

export { init };

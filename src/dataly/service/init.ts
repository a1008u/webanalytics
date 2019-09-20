import { mkDateTime, pixelDepth } from "./common";
import { ur, pr, sl, st, resultjson } from "../domain/resultjson";
import { getLocalStorage } from "../../common/localstorage";
import ip from "ip";

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
async function init(h: number, clienth: number): Promise<resultjson> {
  // 1.アクセスした時間を作成し、計測用のJSON最終形態のstartに追加
  // user初期化
  const uidKey = "_atuid";
  const uuid: string = await getLocalStorage(uidKey);
  const url = location.href;
  const referrer = document.referrer;
  const ua = window.navigator.userAgent.toLowerCase();
  const userJson: ur = new ur(uuid, referrer, url, ua, "");

  // パートナーサイトIDの設定
  const datalyElement: HTMLElement = document.getElementById("__at_dataly");
  const pSiteId: string = datalyElement.getAttribute("__dsd");
  const pTitle: string = document.title;
  const partnerJson: pr = new pr(pSiteId, pTitle);

  // scroll初期化
  const scrolljson: sl = await pixelDepth();

  // startJson初期化
  // js起動時間の確認
  const startdateJst = await mkDateTime();
  const scrollTop: number = document.documentElement.scrollTop;
  const startjson: st = new st(clienth, startdateJst, h, scrollTop);

  // 終了以外の情報でオブジェクト生成
  return new resultjson(userJson, partnerJson, scrolljson, startjson, null);
}

export { init };

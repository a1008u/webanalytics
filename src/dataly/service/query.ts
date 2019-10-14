import { getLocalStorage, storeInLocalStorage } from "../../common/localstorage";
import { resultjson } from "../domain/resultjson";
import { at } from "../domain/resultjson";
import { getIdentifier } from "../../common/identifier";

interface HTMLElementEvent<A extends HTMLElement, I extends HTMLElement> extends Event {
  target: I;
  currentTarget: A;
}

// addEventListenerとremoveEventListenerを機能させるために、
// DatAlyのjsonをグローバルにする。
let resultJsonG: resultjson;

/**
 * atクリック時にクリック対象の識別子とurl取得、またインプのurlも取得
 * DatAlyのグローバルに「識別子とurl、またインプのurl」を格納する
 * @param e
 */
function atRrCC(e: HTMLElementEvent<HTMLAnchorElement, HTMLImageElement>) : void{
  // console.log("e.target - ", e.target)
  // console.log("e.currentTarget - ", e.currentTarget)
  const [_, targetDatalyIdentifier ] = e.currentTarget.href.match(/(atud=.*-)[0-9]*/g).pop().split("-")
  resultJsonG.ur.ir = targetDatalyIdentifier? Number(targetDatalyIdentifier) : 0;
  resultJsonG.ur.ac = e.currentTarget? e.currentTarget.href : "";
  resultJsonG.ur.ar = e.target? e.target.src : "";
}

/**
 * テスト用
 * @param query
 * @param targetKey
 */
function getQueryTargetKeyValue(
  query: string,
  targetKey: string
): string | null {
  if (query) {
    const targetQuery = query
      .split("&")
      .find((q): boolean => q.includes(targetKey));
    if (!targetQuery) {
      return null;
    }
    const [, value] = targetQuery.split("=");
    return value;
  }
  return null;
}


/**
 * [パラメータ書き換え] accesstradeタグにuseridを付与する
 * @param targetkey
 * @param queryKey
 * @param queryValue
 */
async function changeQuery(
  targetkey: string,
  queryKey: string,
  resultJson: resultjson
): Promise<void> {

  resultJsonG = resultJson
  let targetAtags : Array<HTMLAnchorElement> = [];

  // 識別子を取得
  const IdentifierKey = "_atvy"
  let identifier: number = await getIdentifier(IdentifierKey);
  [].forEach.call(
    document.getElementsByTagName("a"),
    async (aTag: HTMLAnchorElement): Promise<void> => {
      let targetAtagHref = aTag.getAttribute("href");
      if (targetAtagHref.includes(targetkey)) {
        targetAtags.push(aTag)

        // 既存のアンカータグに付いているhrefのatudを削除
        if ( targetAtagHref.includes(`?${queryKey}`) || targetAtagHref.includes(`&${queryKey}`)) {
          targetAtagHref = targetAtagHref.replace(/([&|?])atud=.*-[0-9].*([|&]*)/g,"")
        }

        // 新規にアンカータグに付いているhrefのatudを追加(識別子の増加もする)
        const exQuery = `${queryKey}=${resultJson.ur.id}-${++identifier}`;
        if (targetAtagHref.indexOf("#") !== -1) {
          const [url, hash] = aTag.getAttribute("href").split("#");
          aTag.href =
            targetAtagHref.indexOf("?") !== -1
              ? `${url}&${exQuery}#${hash}`
              : `${url}?${exQuery}#${hash}`;
        } else {
          aTag.href =
            targetAtagHref.indexOf("?") === -1
              ? `${targetAtagHref}?${exQuery}`
              : `${targetAtagHref}&${exQuery}`;
        }
      }
    }
  );

  // atのrrとccを全て取得し、DatAlyのグローバル
  targetAtags.forEach((aTag:HTMLAnchorElement) => {
    aTag.childNodes.forEach((e: ChildNode) => {
      if("IMG" === e.nodeName){
        // console.log(aTag.offsetTop, aTag.clientHeight, aTag.offsetTop+aTag.clientHeight)
        // console.log(document.documentElement.clientHeight, document.documentElement.scrollTop, document.documentElement.clientHeight+document.documentElement.scrollTop)
        // console.log(aTag.offsetTop+aTag.clientHeight < document.documentElement.clientHeight+document.documentElement.scrollTop)
        const imageTag: HTMLImageElement = (aTag.children[0] as HTMLImageElement)
        resultJson.at.push(new at(aTag.href, imageTag.src, imageTag.offsetTop, imageTag.clientHeight))
      }
    })
  })

  // atクリック用のイベント追加
  targetAtags.forEach((aTag:HTMLAnchorElement) => {
    aTag.removeEventListener("click", atRrCC);
    aTag.addEventListener("click", atRrCC);
  })

  // 識別子をLocalStorageへ
  storeInLocalStorage(IdentifierKey, String(identifier))
}

export { changeQuery, getQueryTargetKeyValue };

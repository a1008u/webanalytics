import { resultjson } from "../domain/resultjson";

interface HTMLElementEvent<A extends HTMLElement, I extends HTMLElement>
  extends Event {
  target: I;
  currentTarget: A;
}

// addEventListenerとremoveEventListenerを機能させるためにDatAlyのjsonをグローバルにする。
let resultJsonGrobal: resultjson;

/**
 * atクリック時にクリック対象の識別子とurl取得、またインプのurlも取得
 * DatAlyのグローバルに「識別子とurl、またインプのurl」を格納する
 * @param e
 */
function atRRCC(
  e: HTMLElementEvent<HTMLAnchorElement, HTMLImageElement>
): void {
  resultJsonGrobal.sd.tr = "click"
  resultJsonGrobal.ur.ac = e.currentTarget ? e.currentTarget.href : "";
  resultJsonGrobal.ur.ar = e.target && e.target.src ? e.target.src : "";
  
  // 識別子の取得（0の場合はatudの値がないところで遷移している）
  const [_, , targetafiNo] = e.currentTarget.href
    .match(/([&|?]atud=.*-.*-)[0-9]*/g)
    .pop()
    .split("-");
  resultJsonGrobal.ur.ao = targetafiNo ? Number(targetafiNo): 0;
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
async function changeAnchorQuery(
  targetkey: string,
  queryKey: string,
  resultJson: resultjson
): Promise<void> {
  async function getAndChangeAtag(
    targetAtagHref: string,
    afiNo: number
  ): Promise<string> {

    const atudIdentifierQuery = `${queryKey}=${resultJson.ur.ad}-${resultJson.ur.cd}-${afiNo}`;

    // datalyパラメータ「?atud=datalyUserid-識別子」が存在する箇所の入れ替え
    if (targetAtagHref.search(/([?])atud=.*-.*-[0-9]{1,16}/g) != -1) {
      return targetAtagHref.replace(
        /([?])atud=.*-[0-9]{1,16}/g,
        `?${atudIdentifierQuery}`
      );
    }

    //  datalyパラメータ「&atud=datalyUserid-識別子」が存在する箇所の入れ替え
    if (targetAtagHref.search(/([&])atud=.*-.*-[0-9]{1,16}/g) != -1) {
      return targetAtagHref.replace(
        /([&])atud=.*-[0-9]{1,16}/g,
        `&${atudIdentifierQuery}`
      );
    }

    // 非公開機能用：datalyパラメータ「?atud=」が存在する箇所の入れ替え
    if (targetAtagHref.search(/([?])atud=/g) != -1) {
      return targetAtagHref.replace(/([?])atud=/g, `?${atudIdentifierQuery}`);
    }

    // 非公開機能用：datalyパラメータ「&atud=」が存在する箇所の入れ替え
    if (targetAtagHref.search(/([&])atud=/g) != -1) {
      return targetAtagHref.replace(/([&])atud=/g, `&${atudIdentifierQuery}`);
    }

    // targetkey（atのドメイン）に対し、hashがある場合は、hashを最後にしてパラメータ付与
    if (targetAtagHref.indexOf("#") !== -1) {
      const [url, hash] = targetAtagHref.split("#");
      return targetAtagHref.indexOf("?") !== -1
        ? `${url}&${atudIdentifierQuery}#${hash}`
        : `${url}?${atudIdentifierQuery}#${hash}`;
    }

    // hashがないため、urlの後ろにパラメータ付与
    return targetAtagHref.indexOf("?") === -1
      ? `${targetAtagHref}?${atudIdentifierQuery}`
      : `${targetAtagHref}&${atudIdentifierQuery}`;
  }

  resultJsonGrobal = resultJson;
  const targetAtags: HTMLAnchorElement[] = [];

  // 識別子を取得
  let afiNo: number = 0;

  // 対象のAtagのhrefにdatalyのパラメータを付与する
  for (let _i = 0; _i < document.getElementsByTagName("a").length; _i++) {
    const aTag = document.getElementsByTagName("a")[_i];
    const targetAtagHref = aTag.getAttribute("href");
    if (
      targetAtagHref &&
      (targetAtagHref.includes(targetkey) ||
        targetAtagHref.includes(`&${process.env.QUERYKEY}=`) ||
        targetAtagHref.includes(`?${process.env.QUERYKEY}=`))
    ) {
      // アクトレのタグにdatalyのパラメータを設定
      aTag.href = await getAndChangeAtag(targetAtagHref, ++afiNo);
      targetAtags.push(aTag);
      continue;
    }
  }

  // atクリック用のイベント追加
  // clickイベントを複数つけないためにremoveを追加
  targetAtags.forEach((aTag: HTMLAnchorElement): void => {
    aTag.removeEventListener("click", atRRCC);
    aTag.addEventListener("click", atRRCC);
  });
}

export { changeAnchorQuery, getQueryTargetKeyValue };

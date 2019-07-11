import { storeSesstionStorage } from "../../common/sessionstorage";

/**
 * Dataly用のタグを生成
 * @param sessionStorageKey 
 * @param certificationJson 
 */
function mkDataly(sessionStorageKey: string, certificationJson: CertificationJson){
  // scriptタグの生成
  storeSesstionStorage(sessionStorageKey, certificationJson);
  const scriptElement: HTMLScriptElement = document.createElement("script");
  // 属性の追加（datalyで利用するuseridを設定 + srcを追加）
  scriptElement.id = "__at_dataly";
  scriptElement.setAttribute("__dsd", certificationJson.SD);
  scriptElement.setAttribute("src", certificationJson.BL.TG);
  // scriptタグを貼り付け
  document.head.appendChild(scriptElement);
  console.log("Datalyの設定完了");
}


export {mkDataly}
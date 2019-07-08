import { storeSesstionStorage } from "./localstorage";

function mkDataly(sessionStorageKey: string, certificationJson: CertificationJson){
  storeSesstionStorage(sessionStorageKey, certificationJson);
  const scriptElement: HTMLScriptElement = document.createElement("script");
  scriptElement.id = "__at_dataly";
  scriptElement.setAttribute("__atsiteid", certificationJson.SITEID);
  scriptElement.setAttribute("src", certificationJson.BASEURL.TAG);
  document.head.appendChild(scriptElement);

  console.log("datalyの設定完了");
}


export {mkDataly}
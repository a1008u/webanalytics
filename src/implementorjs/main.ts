import { ckCertificattionJson } from "./service/certification";
import { mkDataly } from "./service/createService";

async function main(__atinfo: AccessJson, useService :UseService) {
  const sessionStorageKey = "__atcertification";
  const certificationJson: CertificationJson = await ckCertificattionJson(
    sessionStorageKey,
    __atinfo
  );
  // 利用サービス確認とｓｙロ位
  useService[certificationJson.BASEURL.SERVICENAME](sessionStorageKey, certificationJson)
}

console.log("起動1")

// 認証キーがある場合のみ実行
if (__atinfo.atkey) {

  // 利用サービス処理
  const useService :UseService = {
    dataly:(sessionStorageKey: string, certificationJson: CertificationJson) => mkDataly(sessionStorageKey, certificationJson),
    unknown:(sessionStorageKey: string, certificationJson: CertificationJson) => {}
  }
  main(__atinfo, useService);
}

console.log("起動2")

// async function main(__atinfo: AccessJson) {
//   const sessionStorageKey = "__atcertification";
//   const certificationJson: CertificationJson = await ckCertificattionJson(
//     sessionStorageKey,
//     __atinfo
//   );

//   const useService :UseService = {
//     dataly:(sessionStorageKey: string, certificationJson: CertificationJson) => this.mkDataly(sessionStorageKey, certificationJson),
//     unknown:(sessionStorageKey: string, certificationJson: CertificationJson) => {}
//   }

//   useService[certificationJson.BASEURL.SERVICENAME](sessionStorageKey, certificationJson)

//   // TODO:書き直し　参考（https://qiita.com/hako1912/items/018afbfb1bd45136618a）
//   // switch (certificationJson.BASEURL.SERVICENAME) {
//   //   case "dataly":
//   //     storeSesstionStorage(sessionStorageKey, certificationJson);
//   //     const scriptElement: HTMLScriptElement = document.createElement("script");
//   //     scriptElement.id = "__at_dataly";
//   //     scriptElement.setAttribute("__atsiteid", certificationJson.SITEID);
//   //     scriptElement.setAttribute("src", certificationJson.BASEURL.TAG);
//   //     document.head.appendChild(scriptElement);

//   //     console.log("datalyの設定完了");
//   //     break;
//   //   default:
//   //     console.log("対象なし");
//   //     break;
//   // }
// }


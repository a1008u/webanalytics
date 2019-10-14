import { ckCertificattionJson } from "./service/certification";
import { mkDataly } from "./service/createService";
import { storeUid } from "../common/userid";

import { CertificationJson, AccessJson } from "./domain/certificateJson";
import { UseService } from "./domain/useService";
import { storeSesstionStorage } from "../common/sessionstorage";
// import { storeIdentifier } from "../common/identifier";
import { changeQuery } from "../dataly/service/query";
import { init } from "../dataly/service/init";

/**
 * メイン処理
 * @param __atinfo
 * @param useService
 */
async function main(
  __atinfo: AccessJson,
  useService: UseService
): Promise<void> {
  // 認証確認
  const sessionStorageKey = "__atcertification";
  const certificationJson: CertificationJson = await ckCertificattionJson(
    sessionStorageKey,
    __atinfo
  );

  // 認証できた場合のみ処理を行う
  if (certificationJson) {
    // certificationの情報をsessionstorageに保存
    storeSesstionStorage(sessionStorageKey, certificationJson);

    // uuid生成(格納)
    const uidKey = "__atud";
    await storeUid(uidKey);

    // Baseサービス用の処理を行う
    await useService[certificationJson.BL.SE](
      sessionStorageKey,
      certificationJson
    );

    // 外部サービスとの連携（今後利用するため残す）
    // certificationJson.OL.forEach(optionUrl => {
    //   console.log(optionUrl);
    // });
  }
}

// 認証キーがある場合のみ実行
declare let __atinfo: AccessJson;
if (__atinfo.Ay && __atinfo.Sd) {
  // 利用サービス処理
  const useService: UseService = {
    DatAly: (
      sessionStorageKey: string,
      certificationJson: CertificationJson
    ): Promise<void> => mkDataly(certificationJson)
    // 下記に外部連携のメソッドを追加する
    // unknown: (
    //   sessionStorageKey: string,
    //   certificationJson: CertificationJson
    // ) => {}
  };
  main(__atinfo, useService);
}

// 初期化
// async function main2(){
//   let h = document.documentElement.scrollHeight; // ドキュメントの高さ
//   let clienth = document.documentElement.clientHeight; //高さ
//   let resultJson = await init(h, clienth);
//   changeQuery(process.env.DELIVERYURL, "atud", resultJson);


//   document.addEventListener(
//     "visibilitychange",
//     async (): Promise<void> => {
//       const visibilityState = document.visibilityState;
//       if (visibilityState === "hidden") {
//         console.log("イベントタイプ", event.type, resultJson);
//         // closeExec(resultJson, h);
//       }

//       if (visibilityState === "visible") {
//         // console.log("イベントタイプ", event.type);
//         h = document.documentElement.scrollHeight; // ドキュメントの高さ
//         clienth = document.documentElement.clientHeight; //高さ
//         // 識別子の取得
//         resultJson = await init(h, clienth);
//         changeQuery(process.env.DELIVERYURL, "atud", resultJson);
//       }
//     }
//   );

// }


// main2()
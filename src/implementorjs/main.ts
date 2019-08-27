import { ckCertificattionJson } from "./service/certification";
import { mkDataly } from "./service/createService";
import { getUid } from "./service/userid";
import { changeQuery } from "./service/query";

import { CertificationJson, AccessJson } from "./domain/certificateJson";
import { UseService } from "./domain/useService";
import { storeSesstionStorage } from "../common/sessionstorage";

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

    // uuid生成
    const uidKey = "__atud";
    const uuid: string = await getUid(uidKey);

    // ancher elementのquery書き換え
    const DELIVERYURL: string = process.env.DELIVERYURL;
    changeQuery(DELIVERYURL, "atud", uuid);

    // 利用サービス確認と処理を行う
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

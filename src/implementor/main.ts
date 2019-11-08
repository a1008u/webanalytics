import { ckCertificattionJson } from "./service/certification";
import { mkDataly } from "./service/createService";
import { storeUid } from "../common/userid";

import { CertificationJson, AccessJson } from "./domain/certificateJson";
import { UseService } from "./domain/useService";
import { storeSesstionStorage } from "../common/sessionstorage";

/**
 * [保持とタグ生成]外部との連携を実施
 * 1.Firestore(DataStoreモード)から取得したcertificationの情報をsessionstorageに保存
 * 2.uuid生成(格納)をlocalstorageに格納
 * 3.Baseサービス用の処理を行う(DatAlyのTAG生成)
 * 4.外部サービスとの連携（今後利用するため残す）
 * @param sessionStorageKey
 * @param localStorageKey
 * @param certificationJson
 * @param useService
 */
async function saveAndMkTag(
  sessionStorageKey: string,
  localStorageKey: string,
  certificationJson: CertificationJson,
  useService: UseService
): Promise<void> {
  // 1.Firestore(DataStoreモード)から取得したcertificationの情報をsessionstorageに保存
  storeSesstionStorage(sessionStorageKey, certificationJson);
  // 2.uuid生成(格納)をlocalstorageに格納
  await storeUid(localStorageKey);
  // 3.Baseサービス用の処理を行う(DatAlyのTAG生成)
  await useService[certificationJson.BL.SE](
    sessionStorageKey,
    certificationJson
  );
  // 外部サービスとの連携（今後利用するため残す）
  // certificationJson.OL.forEach(optionUrl => {
  //   console.log(optionUrl);
  // });
}


/**
 * メイン処理
 * @param __atinfo
 * @param useService
 */
async function implementor(
  __atinfo: AccessJson,
  useService: UseService
): Promise<void> {
  // 認証確認
  const certificationJson: CertificationJson = await ckCertificattionJson(
    process.env.SESSIONSTORAGEKEY,
    __atinfo
  );

  // 認証できた場合のみ処理を行う
  if (certificationJson) {
    await saveAndMkTag(
      process.env.SESSIONSTORAGEKEY,
      process.env.LOCALSTORAGEKEY,
      certificationJson,
      useService
    );
  }
}

/**
 * 認証キーがある場合のみ実行
 */
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
  implementor(__atinfo, useService);
}

export { implementor, saveAndMkTag };

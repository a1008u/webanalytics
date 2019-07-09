import { ckCertificattionJson } from "./service/certification";
import { mkDataly } from "./service/createService";

async function main(__atinfo: AccessJson, useService :UseService) {
  // 認証確認
  const sessionStorageKey = "__atcertification";
  const certificationJson: CertificationJson = await ckCertificattionJson(
    sessionStorageKey,
    __atinfo
  );
  // 利用サービス確認と処理を行う
  useService[certificationJson.BASEURL.SERVICENAME](sessionStorageKey, certificationJson)
}

// 認証キーがある場合のみ実行
if (__atinfo.atkey) {

  // 利用サービス処理
  const useService :UseService = {
    dataly:(sessionStorageKey: string, certificationJson: CertificationJson) => mkDataly(sessionStorageKey, certificationJson),
    unknown:(sessionStorageKey: string, certificationJson: CertificationJson) => {}
  }
  main(__atinfo, useService);
}

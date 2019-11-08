import { CertificationJson, AccessJson } from "../domain/certificateJson";
import { getSesstionStorage } from "../../common/sessionstorage";

/**
 * [GAEにアクセス]認証キーを取得する
 * @param IMPLEMENTORJSACCESSURL
 */
async function getCertificationStatus(
  __atinfo: AccessJson,
  IMPLEMENTORJSACCESSURL: RequestInfo
): Promise<any> {
  const method = "POST";
  const body = JSON.stringify(__atinfo);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const handleErrors = (res): any | Error => {
    if (res.ok) {
      return res;
    }
    switch (res.status) {
      case 400:
        throw Error("INVALID_TOKEN");
      case 401:
        throw Error("UNAUTHORIZED");
      case 500:
        throw Error("INTERNAL_SERVER_ERROR");
      case 502:
        throw Error("BAD_GATEWAY");
      case 404:
        throw Error("NOT_FOUND");
      default:
        throw Error("UNHANDLED_ERROR");
    }
  };

  return new Promise((resolve): any => {
    fetch(IMPLEMENTORJSACCESSURL, { method, headers, body })
      .catch((e): void => {
        throw Error(e);
      })
      .then(handleErrors)
      .then((response): any => response.json())
      .then((body): any => resolve(body));
  });
}

/**
 * [認証キーが有効チェック]
 * 1.引数のkeyを用いて、sesssionStorageに認証情報があるか確認
 * 2.Cloud Datastoreからの取得(URLは、envから取得する)
 * 取得できない場合やエラー時はnull
 * @param key
 * @param __atinfo
 * @returns Promise<CertificationJson> or Promise<null>
 */
async function ckCertificattionJson(
  key: string,
  __atinfo: AccessJson
): Promise<CertificationJson> {
  // 引数のkeyを用いて、sesssionStorageに認証情報があるか確認
  const certificationJsonSesstion: CertificationJson = await getSesstionStorage(
    key
  );
  if (certificationJsonSesstion) {
    // console.log("session storageから取得 --- ", certificationJsonSesstion);
    return certificationJsonSesstion;
  }

  // 2.Cloud Datastoreからの取得(URLは、envから取得する)
  // console.log(process.env.IMPLEMENTORJSACCESSURL);
  const IMPLEMENTORJSACCESSURL: string = process.env.IMPLEMENTORJSACCESSURL;
  try {
    const certificationJson = await getCertificationStatus(
      __atinfo,
      IMPLEMENTORJSACCESSURL
    );
    if (certificationJson.error) {
      throw new Error(certificationJson.error);
    }
    return certificationJson;
  } catch (e) {
    return null;
  }
}

export { ckCertificattionJson, getCertificationStatus };

import { CertificationJson, AccessJson } from "../domain/certificateJson";
import { getSesstionStorage } from "../../common/sessionstorage";

/**
 * GAEにアクセスして、認証キーを取得する
 * @param IMPLEMENTORJSACCESSURL 
 */
async function getCertificationStatus(__atinfo: AccessJson, IMPLEMENTORJSACCESSURL: RequestInfo): Promise<any> {
  const method = "POST";
  const body = JSON.stringify(__atinfo);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const handleErrors = (res) => {
    if (res.ok) {
      return res;
    }
    switch (res.status) {
      case 400: throw Error('INVALID_TOKEN');
      case 401: throw Error('UNAUTHORIZED');
      case 500: throw Error('INTERNAL_SERVER_ERROR');
      case 502: throw Error('BAD_GATEWAY');
      case 404: throw Error('NOT_FOUND');
      default: throw Error('UNHANDLED_ERROR');
    }
  };

  return new Promise(resolve => {
    fetch(IMPLEMENTORJSACCESSURL, { method, headers, body })
      .catch((e) => { throw Error(e); })
      .then(handleErrors)
      .then(response => response.json())
      .then(body => resolve(body));
  });
}

/**
 * 認証キーが有効かどうか確認する
 * @param key 
 * @param __atinfo 
 * @returns Promise<CertificationJson>
 */
async function ckCertificattionJson(key: string, __atinfo: AccessJson): Promise<CertificationJson> {

  // sesssionStorageに認証情報があるか確認
  const certificationJsonSesstion: CertificationJson = await getSesstionStorage(key);
  if (certificationJsonSesstion) {
    console.log("session storageから取得 --- ", certificationJsonSesstion);
    return certificationJsonSesstion;
  }

  // Cloud Datastoreからの取得(飛び先は、envから取得する)
  const IMPLEMENTORJSACCESSURL: string = process.env.IMPLEMENTORJSACCESSURL
  console.log(process.env.IMPLEMENTORJSACCESSURL)
  try {
    const certificationJson = await getCertificationStatus(__atinfo, IMPLEMENTORJSACCESSURL);
    if (certificationJson.error) {
      throw new Error(certificationJson.error)
    }
    return certificationJson;
  } catch (e) {
    return null
  }
}

export { ckCertificattionJson, getCertificationStatus }
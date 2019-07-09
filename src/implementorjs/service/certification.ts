import { getSesstionStorage, storeSesstionStorage } from "./localstorage";

/**
 * GAEにアクセスして、認証キーを取得する
 * @param IMPLEMENTORJSACCESSURL 
 */
async function getCertificationStatus(IMPLEMENTORJSACCESSURL: RequestInfo): Promise<any> {
    const method = "POST";
    const body = JSON.stringify(__atinfo);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  
    return new Promise(resolve => {
      fetch(IMPLEMENTORJSACCESSURL, { method, headers, body })
        .then(response => {
          console.log(response, response.body);
          return response.json();
        })
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
        console.log("session storageから取得 --- ",certificationJsonSesstion.ACCESSKEY);
        return certificationJsonSesstion;
    }

    // Cloud Datastoreからの取得(飛び先は、envから取得する)
    const IMPLEMENTORJSACCESSURL: string = process.env.IMPLEMENTORJSACCESSURL
    const certificationJson: CertificationJson = await getCertificationStatus(IMPLEMENTORJSACCESSURL);
    console.log("datastoreから取得 --- ", certificationJson);

    // sessionstorageに保存
    storeSesstionStorage(key, certificationJson)

    return certificationJson;
}

export {ckCertificattionJson}
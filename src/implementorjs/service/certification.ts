// import { IMPLEMENTORJSACCESSURL } from "../../config/config";
import { getSesstionStorage } from "./localstorage";

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
  
async function ckCertificattionJson(key: string, __atinfo: AccessJson): Promise<CertificationJson> {

    // sesssionStorageに認証情報があるか確認
    const certificationJsonSesstion: CertificationJson = await getSesstionStorage(key);
    if (certificationJsonSesstion) {
        console.log("session storageから取得 --- ",certificationJsonSesstion.ACCESSKEY);
        return certificationJsonSesstion;
    }

    // Cloud Datastoreからの取得
    const certificationJson: CertificationJson = await getCertificationStatus(IMPLEMENTORJSACCESSURL);
    console.log("datastoreから取得 --- ", certificationJson);
    return certificationJson;
}

console.log(process.env.NODE_ENV)
console.log(process.env.IMPLEMENTORJSACCESSURL)
console.log(process.env.LOCALDATALYACCESSURL)
export const IMPLEMENTORJSACCESSURL: string =
  process.env.NODE_ENV === "dev"
    ? process.env.IMPLEMENTORJSACCESSURL
    : process.env.LOCALIMPLEMENTORJSACCESSURL;
export const DATALYACCESSURL: string =
  process.env.NODE_ENV === "dev"
    ? process.env.DATALYACCESSURL
    : process.env.LOCALDATALYACCESSURL;

export {ckCertificattionJson}
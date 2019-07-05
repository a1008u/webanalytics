import { storeSesstionStorage, getSesstionStorage } from "./sessionstorage";
import { IMPLEMENTORJSACCESSURL } from "../../config/config";

async function getCertificationStatus(request: RequestInfo): Promise<any> {
    const method = "POST";
    const body = JSON.stringify(__atinfo);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    return new Promise(resolve => {
        fetch(request, {method, headers, body})
        .then(response => {

            console.log(response, response.body)

            return response.json()
        })
        .then(body => resolve(body));
    });
};

async function ckCertificattion(__atinfo : AccessJson): Promise<boolean> {

    const sessionStorageKey : string = '__atcstatus'
    const isActive: boolean = getSesstionStorage(sessionStorageKey)
    if (isActive) {
        console.log("session storageから取得 --- ", isActive)
        return true
    }

    const certificationJson: CertificationJson = await getCertificationStatus(IMPLEMENTORJSACCESSURL);

    // console.log("datastoreから取得 --- ", certificationJson.Isactive)
    // if (certificationJson.Isactive) {
    //     storeSesstionStorage(certificationJson.Isactive);
    //     return true
    // }
    return false
  }

export { getCertificationStatus, ckCertificattion }
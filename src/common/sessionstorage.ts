/**
 *  sessionstorageからデータを格納する
 * @param key 
 * @param certificationJson 
 */
function storeSesstionStorage(
    key: string,
    certificationJson: CertificationJson
  ) {
    sessionStorage.setItem(key, JSON.stringify(certificationJson));
}

/**
 * sessionstorageからデータを取得する
 * @param key 
 */
async function getSesstionStorage(key: string): Promise<CertificationJson> {
    const value: string = sessionStorage.getItem(key);
    const certificationJson: CertificationJson = JSON.parse(value);
    return certificationJson;
}

export {storeSesstionStorage, getSesstionStorage}
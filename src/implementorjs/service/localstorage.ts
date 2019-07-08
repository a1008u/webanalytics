/**
 * localstorageに値 + localstorageの有効期限を格納する
 * @param uuid
 */
function storeSesstionStorage(
    key: string,
    certificationJson: CertificationJson
  ) {
    sessionStorage.setItem(key, JSON.stringify(certificationJson));
  }
  
async function getSesstionStorage(key: string): Promise<CertificationJson> {
    const value: string = sessionStorage.getItem(key);
    const certificationJson: CertificationJson = JSON.parse(value);
    return certificationJson;
}

export {storeSesstionStorage, getSesstionStorage}
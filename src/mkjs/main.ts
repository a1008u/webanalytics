function getSesstionStorage(key: string) :CertificationJson{
    const value: string = sessionStorage.getItem(key);
    const certificationJson:CertificationJson = JSON.parse(value);
    return certificationJson
  };
  
/**
 * localstorageに値 + localstorageの有効期限を格納する
 * @param uuid
 */
function storeSesstionStorage(key: string, certificationJson: CertificationJson){
    sessionStorage.setItem(key, JSON.stringify(certificationJson));
}

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


async function ckCertificattionJson(key:string, __atinfo : AccessJson): Promise<CertificationJson> {

    const certificationJsonSesstion: CertificationJson = getSesstionStorage(key)
    if (certificationJsonSesstion) {
        console.log("session storageから取得 --- ", certificationJsonSesstion.ACCESSKEY)
        return certificationJsonSesstion
    }
  
    const localAccessURL: string = "http://localhost:8080/ckcs"
    const accessURL = "https://dataly.appspot.com/ckcs";
    const certificationJson: CertificationJson = await getCertificationStatus(accessURL);

    console.log("datastoreから取得 --- ", certificationJson)
    return certificationJson
  }


async function main(__atinfo : AccessJson){
    const sessionStorageKey : string = '__atcertification'
    const certificationJson: CertificationJson = await ckCertificattionJson(sessionStorageKey, __atinfo);

    console.log("------------------")
    console.log(certificationJson)
    console.log("------------------")

    // TODO:書き直し　参考（https://qiita.com/hako1912/items/018afbfb1bd45136618a）
    switch (certificationJson.BASEURL.SERVICENAME){
        case "dataly":
            storeSesstionStorage(sessionStorageKey, certificationJson);
        　　const scriptElement: HTMLScriptElement = document.createElement("script");
            scriptElement.id = "__at_dataly"
            scriptElement.setAttribute("__atsiteid", certificationJson.SITEID)
            scriptElement.setAttribute('src', certificationJson.BASEURL.TAG);
            document.head.appendChild(scriptElement);

            console.log("datalyの設定完了")
            break;
        default:
            console.log("対象なし")
            break;
    } 
}

// 認証キーがある場合のみ実行
if (__atinfo.atkey) {
    main(__atinfo); 
  }
  
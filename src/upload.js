import axios from "axios";

// GCPへのアクセス
async function uploadJson(urls, jsondata){
    axios.post(urls, jsondata)
        .then(response => {
            console.log("response is ", response);
            return true;
        }).catch(error => {
            console.log("error is ", error);
            return false;
        });
}


export {uploadJson}

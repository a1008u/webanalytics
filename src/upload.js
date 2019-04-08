// const AWS = require('aws-sdk');
// import { awsconf } from "./aws";
import axios from "axios";

// S3にJSONを転送

// const fileName = 'contacts.csv';
// export const uploadFile = (jsondata) => {

//     const params = {
//         Bucket: 'test-u', // pass your bucket name
//         Key: 'contacts.json', // file will be saved as testBucket/contacts.csv
//         Body: JSON.stringify(jsondata)
//     };

//     console.log("起動")
//     const s3 = new AWS.S3(awsconf);

//     s3.upload(params, (s3Err, data) => {
//         if (s3Err) throw s3Err
//         console.log(`File uploaded successfully at ${data.Location}`)
//     });
// };

// ----- 
// GCPへのアクセス

async function uploadJson(urls, jsondata){

    // axios.post("/json", JSON.stringify(jsondata))
    //   .then((response) => true)
    //   .catch((error) => {
    //     console.log("error is ", error);
    //     return false;
    //   });



    // axios({
    //     method: 'post',
    //     url: 'http://localhost:8080/json',
    //     data: JSON.stringify(test),
    //   })
    // .then((response)=> {
    //     console.log("response is ", response);
    //     return true;
    // })
    // .catch((error) => {
    //     console.log("error is ", error);
    //     return false;
    // });
    
    // axios({
    //     method: 'post',
    //     url: 'http://localhost:8080/json',
    //     data: JSON.stringify(jsondata),
    //     headers: {'Content-Type': 'application/json'}
    //   })
    // .then((response)=> {
    //     console.log("response is ", response);
    //     return true;
    // })
    // .catch((error) => {
    //     console.log("error is ", error);
    //     return false;
    // });


    // const test = {
    //     "integer":31
    //   }
    // console.log("test", test)
    // console.log("JSON.stringify(test)", JSON.stringify(jsondata))
    axios.post(urls, jsondata)
        .then(response => {
            console.log("response is ", response);
            return true;
        }).catch(error => {
            console.log("error is ", error);
            return false;
        });

    // const method = "POST";
    // const body = JSON.stringify(jsondata);
    // const headers = {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json'
    // };
    // fetch(urls, {method, headers, body}).then((res)=> {
    //         console.log("response is ", res);
    //         return true;
    // }).catch(error => {
    //             console.log("error is ", error);
    //             return false;
    //         });
}


export {uploadJson}

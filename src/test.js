const AWS = require('aws-sdk');
import { awsconf } from "./aws";

// const fileName = 'contacts.csv';
export const uploadFile = (jsondata) => {

    const params = {
        Bucket: 'test-u', // pass your bucket name
        Key: 'contacts.json', // file will be saved as testBucket/contacts.csv
        Body: JSON.stringify(jsondata)
    };

    console.log("起動")
    const s3 = new AWS.S3(awsconf);

    s3.upload(params, (s3Err, data) => {
        if (s3Err) throw s3Err
        console.log(`File uploaded successfully at ${data.Location}`)
    });
};

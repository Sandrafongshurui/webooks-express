const AWS = require('aws-sdk');

// Enter copied or downloaded access ID and secret key here
const ID = "AKIA37S2N5TAFEXEMZ7W";
const SECRET = "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";

// The name of the bucket that you have created
const BUCKET_NAME = "webooks-epub-files";

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "ap-southeast-1"
    }
};

s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});
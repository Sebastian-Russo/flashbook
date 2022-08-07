const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: "v4" });

const S3_BUCKET = process.env.S3_BUCKET; // flashbook-load-docs


exports.handler = async event => {
	console.log("RAW EVENT:", JSON.stringify(event));

	// const body = JSON.parse(event.body);
	const body = event.body;
	console.log("Request body:", JSON.stringify(body));

    const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', {
            Bucket: S3_BUCKET,
            Key: 'test', // TODO body.fileName,
            Expires: 3600
        },
        (error, data) => {
            if (error) reject(error);
            console.log("S3 Pre-Signed URL:", data);

            resolve(data);
        });
    });


	return {
		statusCode: 200,
		body: JSON.stringify({
			url
		})
	}
};



/** Tested Successfully **/

// const resposne_s3_get = await s3.getObject({
//     Bucket: "flashbook-load-docs", 
//     Key: "upload/", 
// }).promise()
// console.log("S3 GET Response:", resposne_s3_get);

// const text = resposne_s3_get.Body.toString('utf-8')
// console.log('Buffer decoded:', text)

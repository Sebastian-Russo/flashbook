const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: "v4" });

const S3_BUCKET = process.env.S3_BUCKET; // flashbook-load-docs


exports.handler = async event => {
	console.log("RAW EVENT:", JSON.stringify(event));


    const resposne_list = await s3.listObjectsV2({
        Bucket: S3_BUCKET,
        MaxKeys: 1000,
    }).promise()
    console.log("S3 Response List:", resposne_list);

    const keys = resposne_list.Contents.map(item => item.Key);
    console.log('Keys:', keys);
    console.log('Key length', keys.length);


    const results_text = [];
    for (let i = 0; i < keys.length; i++) {
        const params = {
            Bucket: S3_BUCKET,
            Key: keys[i]
        }
        // console.log('Params:', params)

        const resposne_s3_get = await s3.getObject(params).promise();
        console.log("S3 GET Response:", resposne_s3_get);
        
        const text = resposne_s3_get.Body.toString('utf-8');
        // console.log('Buffer decoded:', text);
        results_text.push({[keys[i]]: text});
    } 
    console.log("Results:", results_text);



	return {
		statusCode: 200,
		body: JSON.stringify({
			results_text
		})
	}
};



/** Tested Successfully **/

// const resposne_s3_get = await s3.getObject({
//     Bucket: S3_BUCKET,
//     Key: "upload/",
// }).promise()
// console.log("S3 GET Response:", resposne_s3_get);

// const text = resposne_s3_get.Body.toString('utf-8')
// console.log('Buffer decoded:', text)




// const url = await new Promise((resolve, reject) => {
//     s3.getSignedUrl('getObject', {
//         Bucket: S3_BUCKET,
//         Key: 'test', // TODO body.fileName,
//         Expires: 3600
//     },
//     (error, data) => {
//         if (error) reject(error);
//         console.log("S3 Pre-Signed URL:", data);

//         resolve(data);
//     });
// });
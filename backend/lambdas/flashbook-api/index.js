const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: "v4" });

const S3_BUCKET = process.env.S3_BUCKET; // flashbook-load-docs


exports.handler = async event => {
	console.log("RAW EVENT:", JSON.stringify(event));

	// const body = JSON.parse(event.body);
	const body = event.body;
	console.log("Request body:", JSON.stringify(body));


	// PUT
	const url_put = await new Promise((resolve, reject) => { 
		s3.getSignedUrl('putObject', {
			Bucket: S3_BUCKET,
			Key: 'example', // `${(Math.random() + 1).toString(36).substring(2)}`,
			Body: 'hello world!!!',
			Expires: 600,
			ContentType: "text/html",
		},
		(error, data) => {
			if (error) {
				console.log('Error:', error)
				reject(error)
			}
			console.log("S3 Pre-Signed URL:", data);

			resolve(data);
		})
	});



	return {
		// statusCode: 200,
		// body: JSON.stringify({
		// 	url
		// })
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

// const put = await s3.putObject({
// 	Bucket: S3_BUCKET,
// 	Key: 'hello-world',
// 	Body: 'Hello World!!!'
// }).promise();
// console.log("PUT Response:", put);


/** Tested Successfully **/
// GET
// const url_get = await new Promise((resolve, reject) => {
// 	s3.getSignedUrl('getObject', {
// 		Bucket: S3_BUCKET,
// 		Key: body.fileName,
// 		Expires: 3600
// 	},
// 	(error, data) => {
// 		if (error) reject(error);
// 		console.log("S3 Pre-Signed URL:", data);

// 		resolve(data);
// 	});
// });

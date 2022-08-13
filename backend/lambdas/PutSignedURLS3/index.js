const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: "v4" });

const S3_BUCKET = process.env.S3_BUCKET; // flashbook-load-docs


exports.handler = async event => {
	console.log("RAW EVENT:", JSON.stringify(event));

	const body = JSON.parse(event.body);

	const name = body.name;
	const content = body.content;
	const file_type = body.type;

	console.log("Name:", name);
	console.log("Content:", content);
	console.log("File type:", file_type);

    const response_put = await s3.putObject({
        Bucket: S3_BUCKET,
        Key: `${name}-${(Math.random() + 1).toString(36).substring(2)}`,
        Body: JSON.stringify(content)
    }).promise();
    console.log("PUT Response:", response_put);


	// PUT
	// const url_put = await new Promise((resolve, reject) => {
	// 	s3.getSignedUrl('putObject', {
	// 		Bucket: S3_BUCKET,
	// 		Key: 'example', // `${(Math.random() + 1).toString(36).substring(2)}`,
	// 		Body: 'hello world!!!',
	// 		Expires: 600,
	// 		ContentType: "text/html",
	// 	},
	// 	(error, data) => {
	// 		if (error) {
	// 			console.log('Error:', error)
	// 			reject(error)
	// 		}
	// 		console.log("S3 Pre-Signed URL:", data);

	// 		resolve(data);
	// 	})
	// });



	// return {
	// 	statusCode: 200,
	// 	body: JSON.stringify({
	// 		url
	// 	})
	// }

	return {
		Response: response_put
	}
};

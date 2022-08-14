const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: "v4" });

const S3_BUCKET = process.env.S3_BUCKET; // flashbook-load-docs


exports.handler = async event => {
	console.log("RAW EVENT:", JSON.stringify(event));

	const decoded = Buffer.from(event.body, 'base64').toString('ascii');
	console.log('Decoded:', decoded);
	const body = JSON.parse(decoded);

	const name = body.name;
	const content = body.content;
	const file_type = body.type;
	const last_modified = body?.lastModifiedDate;

	console.log("Name:", name);
	console.log("Content:", content);
	console.log("File type:", file_type);
	console.log("Last Modified:", last_modified);

    const response_put = await s3.putObject({
        Bucket: S3_BUCKET,
        Key: `${name.slice(0,-4)}-${(Math.random() + 1).toString(36).substring(2)}${name.slice(-4)}`,
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

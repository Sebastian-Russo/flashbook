const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: "v4" });

const S3_BUCKET = process.env.S3_BUCKET; // flashbook-load-docs


exports.handler = async event => {
	console.log("RAW EVENT:", JSON.stringify(event));

	const body = JSON.parse(event.body);
	console.log('Body:', JSON.stringify(body));

	const name = body.body.name;
	const content = body.body.content;
	const file_type = body.body.filetype;

	console.log("Name:", name);
	console.log("Content:", content);
	console.log("File type:", file_type);

    const put = await s3.putObject({
        Bucket: S3_BUCKET,
        Key: `${name}-${(Math.random() + 1).toString(36).substring(2)}`,
        Body: JSON.stringify(content)
    }).promise();
    console.log("PUT Response:", put);

	// curl -H "Origin: http://localhost:8080" -v "https://mpvz72hebb.execute-api.us-east-1.amazonaws.com/dev/upload"

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
		statusCode: 200,
		message: "Success"
	}
};

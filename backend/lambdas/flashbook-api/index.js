const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async event => {
    console.log("RAW EVENT:", JSON.stringify(event));

	s3.getSignedUrl('putObject', {
		Bucket: 'flashbook-load-docs', 
		Key: 'test/text', 
		Body: "random string"
	},  
	function (err, url) {
		if (err) {
		  console.log(err)
			return (null, err);
		} else {
		  console.log(url)
			return (null, url);    
		}
	});

}






    /** Tested Successfully **/
    // const resposne_s3_get = await s3.getObject({
    //     Bucket: "flashbook-load-docs", 
    //     Key: "upload/", 
    // }).promise()
    // console.log("S3 GET Response:", resposne_s3_get);

    // const text = resposne_s3_get.Body.toString('utf-8')
    // console.log('Buffer decoded:', text)


    // const resposne_s3_put = await s3.getSignedUrl('putObject', {
    //     Bucket: "flashbook-load-docs", 
    //     Key: "test/",
	// 	// ContentType: fileType,
    //     Body: "random string"
    // }).promise();
    // console.log("S3 UPDATE Response:", resposne_s3_put);
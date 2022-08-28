import { Stage, StageProps, Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/lambda";
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from "constructs"; // ???
import { Bucket } from '../s3/index';

class Lambda extends Construct {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id);
    
	// IAM role resource
	// s3 bucket resource

    // defines an AWS Lambda resource
	const handler = new lambda.Function(this, 'Function', {
		runtime: lambda.Runtime.NODEJS_16_X,    // execution environment
		code: lambda.Code.fromAsset('../../../../backend/lambdas/GetS3Docs'),  // code loaded from "lambda" directory
		handler: 'index.handler',                // file is "index", function is "handler"
		environment: {
			BUCKET: Bucket.bucketName
		}
	});

  }



  // lambda layer resource

}

export {
	Lambda
}

import { Stage, StageProps, Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from "aws-cdk-lib";
import * as lambda from '@aws-cdk/aws-lambda';
import { Construct } from 'constructs';
import { Lambda } from './constructs/lambda/index';
import { Bucket } from './constructs/s3/index';


// All constructs that represent AWS resources must be defined, directly or indirectly, within the scope of a Stack construct
// Define (also known as to instantiate)

interface DeploymentStackProps extends StackProps {
  env: {
    account: string;
    region: string;
    stage: string;
  }
}

export class DeploymentStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: DeploymentStackProps) {
		super(scope, id, props);

    // The code that defines (instantiates) your stack goes here

    const s3Bucket = new Bucket(this, 'flashbook-docs', {
      bucketName: 'flashbook-docs',
    });

    new Lambda(this, 'GetS3Docs', {
		assetPath: '../../backend/lambdas/GetS3Docs',
		env: {
			BUCKET_NAME: s3Bucket.Bucket.bucketArn
		},
    functionName: 'GetS3Docs',
		// layers: '',
		// role: ''
    });


    new Lambda(this, 'UploadS3Docs', {
		assetPath: '../../backend/lambdas/GetS3Docs',
		env: {
			BUCKET_NAME: s3Bucket.Bucket.bucketArn
		},
    functionName: 'UploadS3Docs',
		// layers: '',
		// role: ''
    });



    // Static Site
    // API Gateway
  }
}

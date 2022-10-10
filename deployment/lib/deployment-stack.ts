import { Stage, StageProps, Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from "aws-cdk-lib";
import * as lambda from '@aws-cdk/aws-lambda';
import { Construct } from 'constructs';
import { Lambda, Layer } from './constructs/lambda/index';
import { Bucket } from './constructs/s3/index';
import { Role } from './constructs/IAM';


interface DeploymentStackProps extends StackProps {
  env: {
    account: string;
    region: string;
    stage: string;
  }
}

export class DeploymentStack extends cdk.Stack {
  public readonly stage: string;

	constructor(scope: Construct, id: string, props?: DeploymentStackProps) {
		super(scope, id, props);

		const env = {
			...props!.env,
			envName: this.stage
		}

/********** S3 Bucket **********/
		// TODO
		// const s3Bucket = new Bucket(this, 'flashbook-docs', {
		// 	bucketName: 'flashbook-docs',
		// });


/********** Lambdas w. Layers & Roles **********/

		const lambda_cloudwatch_default_policy = cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole");

		// const layer = new Layer(this, 'name', {
		//   assetPath: '',
		//   env
		// })

		const getDocsLambdaRole = new Role(this, 'getDocsLambdaRole', {
			env,
			inlinePolicies: {
				'AllowS3': new cdk.aws_iam.PolicyDocument({
					statements: [new cdk.aws_iam.PolicyStatement({
						actions: ["s3:listObjectsV2", "s3:getObject"],
						resources: [`arn:aws:s3:${env.region}:${env.account}:???`] // TODO
					})]
				})
			},
			managedPolicies: [lambda_cloudwatch_default_policy],
			servicePrinciple: 'lambda.amazonaws.com'
		})
		new Lambda(this, 'GetS3Docs', {
			assetPath: '../backend/lambdas/GetS3Docs',
			env,
			// layers: [layer.layerResource],
			role: getDocsLambdaRole.IAMResource
		});


		const uploadS3DocsLambdaRole = new Role(this, 'uploadS3DocsLambdaRole', {
			env,
			inlinePolicies: {
				'AllowS3': new cdk.aws_iam.PolicyDocument({
					statements: [new cdk.aws_iam.PolicyStatement({
						actions: ["s3:putObject"],
						resources: [`arn:aws:s3:${env.region}:${env.account}:???`] // TODO
					})]
				})
			},
			managedPolicies: [lambda_cloudwatch_default_policy],
			servicePrinciple: 'lambda.amazonaws.com'
		});
		new Lambda(this, 'UploadS3Docs', {
			assetPath: '../backend/lambdas/GetS3Docs',
			env,
			// layers
			role: uploadS3DocsLambdaRole.IAMResource
		});





/********** API Gateway **********/
/********** Static Site **********/


  }
}

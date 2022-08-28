import { Stage, StageProps, Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from "aws-cdk-lib";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from "constructs"; // ???
import { Bucket } from '../s3/index';

// add params here for types
interface LambdaConstructProps {
	runtime: lambda.Runtime; //(enum type) pass props from stack lambda being defined
	environment?: Record<string,string>
	//
	//
}

class Lambda extends Construct {
  constructor(scope: Construct, id: string, props: LambdaConstructProps) {
    super(scope, id);
    
	// Basic Lambda execution role, write logs to cloud watch (hardcode) (add not create)
	// Permissions (custom) define inline with role
	// const lambdaRole = new iam.Role(this, 'Role', {
	// 	assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
	// 	description: 'Example role...',
	//   });

	// Lambda Insights
	// IAM role resource
	// s3 bucket resource

    // defines an AWS Lambda resource
	const handler = new lambda.Function(this, 'Function', {
		runtime: props.runtime,    // execution environment
		code: lambda.Code.fromAsset(''),  // code loaded from "lambda" directory
		handler: 'index.handler'                // file is "index", function is "handler"
	});

  }



  // lambda layer resource

}

export {
	Lambda
}

// STEPS
// Go through params, pick required and optional
// Add params to interface in construct (check types and add types to interface)
// Define parameters in stack def when initializing new construct/resouce
// (deployment stack = parent, custom construct = child, props pass through deployment to custom construct)

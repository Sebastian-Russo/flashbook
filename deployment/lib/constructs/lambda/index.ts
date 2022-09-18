import { Stage, StageProps, Stack, StackProps, Duration } from 'aws-cdk-lib';
import * as cdk from "aws-cdk-lib";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from "constructs"; // ???
import { Bucket } from '../s3/index';
import { ILayerVersion } from 'aws-cdk-lib/aws-lambda';
import { IRole } from 'aws-cdk-lib/aws-iam';

// import layer from '../../../../backend/layers';

// add params here for types
interface LambdaConstructProps {
	// lambda types
	assetPath: string;
	code?: lambda.Code;
	description?: string;
	env?: Record<string,string>
	handler?: string; // file is "index", function is "handler"
	functionName?: string;
	layers?: ILayerVersion [];
	memorySize?: number;
	role?: IRole;
	runtime?: typeof lambda.Runtime.NODEJS_16_X; //(enum type) pass props from stack lambda being defined
	timeout?: Duration;
}

class Lambda extends Construct {
	constructor(scope: Construct, id: string, props: LambdaConstructProps) {
		super(scope, id);
		let env = props.env;
		let constructId = id;

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
		const handler = new lambda.Function(this, `${constructId}LambdaFunction`, {
			code: lambda.Code.fromAsset(props.assetPath),
			handler: props.handler || "index.handler",
			functionName: props.functionName,
			layers: "", // layer inside of contruct ?
			memorySize: props.memorySize || 128,
			role: "", // layer inside of contruct ?
			runtime: props.runtime || lambda.Runtime.NODEJS_16_X,
			timeout: props.timeout || Duration.seconds(3)
		});


	}

}


interface ILayerProps {
	assetPath: string; // '../../../../backend/layers'
	code?: lambda.Code;
	compatibleArchitectures?: lambda.Architecture;
	compatibleRuntimes?: lambda.Runtime;
	description: string;
	env: Record<string,string>;
	layerVersionName: string;
	removalPolicy?: cdk.RemovalPolicy;
}

class Layer extends Construct {
	constructor(scope: Construct, id: string, props: ILayerProps) {
		super(scope, id);
		let env = props.env;
		let constructId = id;

		const layerVersion = new lambda.LayerVersion(this, `${constructId}MyLayer`, {
			architecture: lambda.Architecture.ARM_64,
			code: lambda.Code.fromAsset(props.assetPath),
			compatibleArchitectures: props.compatibleArchitectures || [lambda.Architecture.X86_64, lambda.Architecture.ARM_64],
			compatibleRuntimes: props.compatibleRuntimes,
			removalPolicy: cdk.RemovalPolicy.RETAIN,
		});

	}
}


export {
	Lambda,
	Layer
}

// STEPS
// Go through params, pick required and optional

// Add params to interface in construct (check types and add types to instance)
// Define parameters in stack def when initializing new construct/resouce
// (deployment stack = parent, custom construct = child, props pass through deployment to custom construct)

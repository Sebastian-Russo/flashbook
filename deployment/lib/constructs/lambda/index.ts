import { Stage, StageProps, Stack, StackProps, Duration } from 'aws-cdk-lib';
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs"; // ???
import { ILayerVersion } from 'aws-cdk-lib/aws-lambda';
import { IRole } from 'aws-cdk-lib/aws-iam';

// import layer from '../../../../backend/layers';

// add params here for types
interface LambdaConstructProps {
	assetPath: string;
	code?: cdk.aws_lambda.Code;
	description?: string;
	env?: Record<string,string>
	handler?: string; // file is "index", function is "handler"
	functionName?: string;
	layers?: ILayerVersion [];
	memorySize?: number;
	role: IRole;
	runtime?: cdk.aws_lambda.Runtime; //(enum type) pass props from stack lambda being defined
	timeout?: Duration;
}

class Lambda extends Construct {
	public readonly LambdaResource: cdk.aws_lambda.Function;

	constructor(scope: Construct, id: string, props: LambdaConstructProps) {
		super(scope, id);
		let env = props.env;
		let constructId = id;


		this.LambdaResource = new cdk.aws_lambda.Function(this, `${constructId}-LambdaFunction-${env!.envName}`, {
			code: cdk.aws_lambda.Code.fromAsset(props.assetPath),
			handler: props.handler || "index.handler",
			functionName: props.functionName,
			layers: props.layers,
			memorySize: props.memorySize || 128,
			role: props.role,
			runtime: props.runtime || cdk.aws_lambda.Runtime.NODEJS_16_X,
			timeout: props.timeout || Duration.seconds(3)
		});


	}

}


interface ILayerProps {
	assetPath: string; // '../../../../backend/layers'
	code?: cdk.aws_lambda.Code;
	compatibleArchitectures?: cdk.aws_lambda.Architecture[];
	compatibleRuntimes?: cdk.aws_lambda.Runtime[];
	description?: string;
	env: Record<string,string>;
	layerVersionName?: string;
	removalPolicy?: cdk.RemovalPolicy;
}

class Layer extends Construct {
	public readonly layerResource: cdk.aws_lambda.LayerVersion;

	constructor(scope: Construct, id: string, props: ILayerProps) {
		super(scope, id);
		let env = props.env;
		let constructId = id;

		this.layerResource = new cdk.aws_lambda.LayerVersion(this, `${constructId}-LambdaLayer-${env.envName}`, {
			code: cdk.aws_lambda.Code.fromAsset(props.assetPath),
			compatibleArchitectures: props.compatibleArchitectures || [cdk.aws_lambda.Architecture.X86_64, cdk.aws_lambda.Architecture.ARM_64],
			compatibleRuntimes: props.compatibleRuntimes || [cdk.aws_lambda.Runtime.NODEJS_16_X],
			removalPolicy: cdk.RemovalPolicy.RETAIN,
		});

	}
}


export {
	Lambda,
	Layer
}

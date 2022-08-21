import { Stage, StageProps, Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/lambda";
import { Construct } from "constructs"; // ???

/** @namespace */
export interface LambdaProps {
    env: Environment;
    /**
     * File path to the Lambda's code. Either a directory with the Lambda code bundle or a .zip file.
     */
    assetPath: string;
    /**
     * Function handler in Lambda code.
     *
     * For example: 'lambda_function.lambda_handler' (Python), 'index.handler' (node.js)
     */
    handler: string;
    /**
     * Lambda runtime.
     */
    runtime: lambda.Runtime;
    /**
     * Name of the function.
     */
    functionName: string;
    /**
     * Function description.
     */
    description?: string;
    /**
     * Environment variables for the function.
     */
    lambdaEnvironment?: { [key: string]: string };
    /**
     * Function timeout.
     *
     * @default 7 seconds
     */
    timeout?: number;
    /**
     * Amount of memory to allocate to the function in MB.
     *
     * @default 256
     */
    memorySize?: number;
    /**
     * Role to add to the function.
     *
     * Will override the default role. Can't be used in tandem with policyStatements.
     *
     * @default - A new role will be created with basic permissions and any additional permissions added by props.
     */
    iamRole?: iam.IRole;
    /**
     * Policy statements to be added to the default role.
     */
    policyStatements?: iam.PolicyStatement[];
    /**
     * Enable Lambda insights, which adds additional system and function info to logs.
     *
     * @default true
     */
    addLambdaInsights?: boolean;
    /**
     * Add alarms that are triggered when the function errors out.
     *
     * @default true
     */
    addAlarms?: boolean;
    /**
     * SNS Topic to send Cloudwatch Alarm notifications to.
     */
    alarmSnsTopic?: sns.Topic;
    /**
     * Enable X-Ray tracing.
     *
     * @default true
     */
    addXRay?: boolean;
    /**
     * Layers to include in the Lambda function.
     */
    layers?: lambda.LayerVersion[];
}
  
const defaultProps: Partial<LambdaProps> = {
  description: "",
  timeout: 7,
  memorySize: 256,
  addLambdaInsights: true,
  addAlarms: true,
  addXRay: true,
  layers: [],
};


export class FlashbookCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id);
    props = { ...defaultProps, ...props };
    
    let env = props?.env;
    let constructId = id;


    // defines an AWS Lambda resource
    const lambdaFunction = new lambda.Function(this, 'Function', {
      runtime: lambda.Runtime.NODEJS_16_X,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'index.handler'                // file is "index", function is "handler"
    });

  }
}

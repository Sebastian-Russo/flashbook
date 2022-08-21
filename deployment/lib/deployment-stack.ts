import { Stage, StageProps, Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from "aws-cdk-lib";
import { Construct } from 'constructs'; // ???

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
  
    // lambda GetS3Docs
    // lambda UploadS3Docs
    // s3 Bucket
    // Static Site


  }
}

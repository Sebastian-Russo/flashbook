import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { aws_s3 as s3, aws_iam as iam } from "aws-cdk-lib";

export class Bucket extends Construct {
    
    const bucket = new s3.Bucket(this, 'flashbook-library', {
        // blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        // encryption: BucketEncryption.S3_MANAGED,
        // enforceSSL: true,
        // versioned: true,
        removalPolicy: RemovalPolicy.RETAIN,
    });
    
    const result = bucket.addToResourcePolicy(new iam.PolicyStatement({
        actions: ['s3:GetObject, s3:PutObject'],
        resources: [bucket.arnForObjects('file.txt')],
        principals: [new iam.AccountRootPrincipal()],
    }));
    
    // declare const myLambda: lambda.Function;
    // bucket.grantReadWrite(myLambda);
    
}

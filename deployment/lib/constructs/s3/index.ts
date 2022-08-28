import { Stage, StageProps, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { aws_s3 as s3, aws_iam as iam } from "aws-cdk-lib";
import { Lambda } from '../lambda/index';

class Bucket extends Construct {
    public readonly Bucket: s3.Bucket // enum type
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id);

        // Create Bucket
        const bucket = new s3.Bucket(this, 'flashbook-library', {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        // Add Bucket Policy
        const result = bucket.addToResourcePolicy(new iam.PolicyStatement({
            actions: ['s3:GetObject, s3:PutObject'],
            resources: [bucket.arnForObjects('file.txt')],
            principals: [new iam.AccountRootPrincipal()],
        }));

        // declare const myLambda: lambda.Function;
        bucket.grantReadWrite(Lambda);

    }
}

export {
    Bucket
}

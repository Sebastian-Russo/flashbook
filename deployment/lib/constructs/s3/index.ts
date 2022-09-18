import { Stage, StageProps, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { aws_s3 as s3, aws_iam as iam, aws_kms as kms } from "aws-cdk-lib";
import { Lambda } from '../lambda/index';
import { SHA256Hash } from 'aws-sdk/clients/mediastoredata';

interface BucketProps {
    autoDeleteObjects?: boolean;
    blockPublicAccess?: s3.BlockPublicAccess;
    bucketKeyEnabled?: boolean;
    bucketName: string;
    cors?: s3.CorsRule[];
    encryptionKey?: kms.IKey;
    removalPolicy?: cdk.RemovalPolicy;
}

class Bucket extends Construct {
    public readonly Bucket: s3.Bucket // enum type
    constructor(scope: Construct, id: string, props?: BucketProps) {
        super(scope, id);

        const bucket = new s3.Bucket(this, 'flashbook-library', {
            autoDeleteObjects: props?.autoDeleteObjects || true,
            blockPublicAccess: props?.blockPublicAccess || s3.BlockPublicAccess.BLOCK_ALL,
            bucketKeyEnabled: props?.bucketKeyEnabled || false,
            bucketName: props?.bucketName,
            cors: props?.cors,
            encryptionKey: props?.encryptionKey,
            removalPolicy: cdk.RemovalPolicy.DESTROY
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

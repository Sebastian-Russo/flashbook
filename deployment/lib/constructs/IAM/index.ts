import { Stage, StageProps, Stack, StackProps, Duration } from 'aws-cdk-lib';
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { IManagedPolicy, IPrincipal, PolicyDocument } from 'aws-cdk-lib/aws-iam';

interface IIAMProps {
    description?: string;
    env: Record<string,string>
    inlinePolicies?: Record<string, PolicyDocument>;
    managedPolicies?: IManagedPolicy[];
    roleName?: string;
    servicePrinciple: string; // 'lambda.amazonaws.com'
}

class Role extends Construct {
    public readonly IAMResource: cdk.aws_iam.Role;

    constructor(scope: Construct, id: string, props: IIAMProps) {
        super(scope,id)
        let env = props.env;
        let constructid = id;

        this.IAMResource = new cdk.aws_iam.Role(this, `${constructid}-Role-${env.envName}`, {
			assumedBy: new cdk.aws_iam.ServicePrincipal(props.servicePrinciple),
            inlinePolicies: props.inlinePolicies,
            managedPolicies: props.managedPolicies,
            roleName: props.roleName
        })
    }
}

export {
    Role
}

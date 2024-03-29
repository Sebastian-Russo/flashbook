#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DeploymentStack } from '../lib/deployment-stack';

const app = new cdk.App();

new DeploymentStack(app, 'FlashbookStack', {

  // Deploy stack to seb-sandbox
  env: {
    account: '539814242117',
    region: 'us-east-1',
    stage: 'dev'
  },

  // Deploy stack to seb-nation
  // env: {
  //   account: '967382976609',
  //   region: 'us-east-1',
  //   stage: 'prod'
  // },


});

app.synth()

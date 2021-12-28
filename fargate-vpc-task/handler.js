'use strict';
const sdk = require('aws-sdk');
const {nanoid} = require('nanoid');
const ecs = new sdk.ECS();
const batch = new sdk.Batch();

module.exports.createJob = async (event) => {
  try {
    const task = await ecs.runTask({
      cluster: process.env.Cluster,
      count: 1,
      launchType: 'FARGATE',
      taskDefinition: process.env.Task,
      networkConfiguration: {
        awsvpcConfiguration: {
          securityGroups: [
            process.env.SG
          ],
          subnets: [
            process.env.Subnet
          ]
        }
      }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        task,
        null,
        2
      ),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error.message
    };
  }
};

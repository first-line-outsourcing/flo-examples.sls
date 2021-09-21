import type { AWS } from '@serverless/typescript';

const masterConfig: AWS = {
  service: 'get-media-info-service',
  configValidationMode: 'warn',
  variablesResolutionMode: '20210326',
  unresolvedVariablesNotificationMode: 'error',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: '${opt:stage, "dev"}',
    lambdaHashingVersion: '20201221',
    // @ts-ignore
    region: 'us-east-1',
    profile: 'flo-examples',
    logs: {
      httpApi: true,
    },
    httpApi: {
      useProviderTags: true,
      payload: '2.0',
      cors: false,
    },
  },
  functions: {
    getMediaInfo: {
      handler: 'api/media-info/handler.getMediaInfo',
      description: 'Return Media Info by video URL',
      timeout: 28,
      events: [
        {
          httpApi: {
            path: '/api/media-info',
            method: 'post',
          },
        },
      ],
    },
  },
  package: {
    individually: true,
    patterns: ['bin/*'],
  },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: {
        forceExclude: ['aws-sdk'],
      },
      concurrency: 5,
      serializedCompile: true,
      packager: 'npm',
    },
  },
  plugins: [
    'serverless-webpack',
  ],
};

module.exports = masterConfig;

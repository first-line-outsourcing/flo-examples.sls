import { MediaInfoCurlService } from './media-info-curl.service';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { MediaInfoUrl } from './media-info.inteface';
import { MediaInfoManager } from './media-info.manager';
import { SimpleHttpError } from './SimpleHttpError';

/**
 * It's required if you use any external executable files like mediainfo-curl
 */
if (process.env.LAMBDA_TASK_ROOT) {
  process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}/bin`;
}

/**
 * This is a handler file
 * It should contain Lambda functions for one feature
 * For example, Media Info feature
 * Or CRUD operations for the user entity
 */

/**
 * This is a Lambda function
 * It implements some functionality of the feature
 *
 * It should only create a feature manager object and call the manager's method
 * All required data should be provided to the manager's method
 * Do not provide event or context objects
 * You should create interfaces for required data
 * All required services except feature service should be provided to the manager's method
 *
 * This function should handle all errors and return them with proper structure
 * @param event - APIGateway, SQS Trigger, SNS Trigger, etc. event object
 * @param context
 */

export const getMediaInfo: APIGatewayProxyHandlerV2 = async (event, context) => {
  console.debug(event);

  try {
    /**
     * Create the manager object
     */
    const manager = new MediaInfoManager();

    /**
     * Prepare required data
     */
    const mediaInfoUrl: MediaInfoUrl = JSON.parse(event.body!);

    /**
     * Prepare required services
     */
    const mediaInfoCurlService = new MediaInfoCurlService();

    /**
     * Call the manager's method
     */
    const result = await manager.getMediaInfo(mediaInfoUrl, mediaInfoCurlService);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    };
  } catch (error: unknown) {
    /**
     * Handle all errors
     */
    console.error(error);

    if (error instanceof SimpleHttpError) {
      return {
        statusCode: error.status,
        body: error.message
      }
    }

    return {
      statusCode: 500,
      body: 'Oops! Something went wrong. Check the logs for more information about error.',
    };
  }
};

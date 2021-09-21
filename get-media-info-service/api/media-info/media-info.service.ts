import { MediaInfoCurlService, Track } from './media-info-curl.service';
import { SimpleHttpError } from './SimpleHttpError';

/**
 * It's the feature service
 * Its methods should implement one of the main steps of some feature's functionality
 */
export class MediaInfoService {
  /**
   * This method implements one of the main steps of some feature's functionality
   * @param url - required data
   * @param mediaInfoCurlService - required services
   */
  async getMediaInfo(url: string, mediaInfoCurlService: MediaInfoCurlService): Promise<Track[]> {
    // Try to catch unexpected errors
    let mediaInfo: Track[] | undefined;

    try {
      mediaInfo = await mediaInfoCurlService.getMediaInfo(url);
    } catch (e) {
      console.error(e);
      throw new SimpleHttpError(500, 'Cannot get mediainfo. See the logs for more information about error.');
    }

   // If !mediaInfo it means that the URL is broken or doesn't have access
    if (!mediaInfo) {
      throw new SimpleHttpError(400, 'Cannot extract media info. Please, check your URL');
    }

    return mediaInfo;
  }
}

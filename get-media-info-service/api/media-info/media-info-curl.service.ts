/**
 * This file contains the service that works with some third party library, API, etc.
 * This file should contain all required interfaces for this service
 */
import { execFile } from 'child_process';
import { promisify } from 'util';

if (process.env.LAMBDA_TASK_ROOT) {
  process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}/bin`;
}

const execPromise = promisify(execFile);

export interface MediaInfo {
  media?: Media;
}

export interface Media {
  track?: Track[];
}

export interface Track {
  // Example: 100.100 = 100 seconds and 100 milliseconds
  Duration?: string;
  // ...other info
}

/**
 * This services works with some third party library, API, etc.
 */
export class MediaInfoCurlService {
  private readonly mediaInfoCurl = 'mediainfo-curl';

  /**
   * Get media info by an URL
   *
   * @param url An URL of media file
   */
  async getMediaInfo(url: string): Promise<Track[] | undefined> {
    const result = await execPromise(
      this.mediaInfoCurl,
      [
        '--Output=JSON',
        '-f',
        // https://github.com/MediaArea/MediaInfoLib/issues/221#issuecomment-615178083
        '--urlencode',
        url,
      ],
      {}
    );

    try {
      const mediaInfo: MediaInfo = JSON.parse(result.stdout);
      return mediaInfo?.media?.track;
    } catch (error) {
    }
  }
}

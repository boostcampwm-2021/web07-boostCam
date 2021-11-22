import { HttpException, Injectable } from '@nestjs/common';

import * as AWS from 'aws-sdk';

@Injectable()
export class ImageService {
  async uploadFile(file: Express.Multer.File) {
    const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');

    const S3 = new AWS.S3({
      endpoint: endpoint,
      region: process.env.NCP_STORAGE_REGION,
      credentials: {
        accessKeyId: process.env.NCP_STORAGE_ACCESS_KEY,
        secretAccessKey: process.env.NCP_STORAGE_SECRET_KEY,
      },
    });

    const bucket_name = process.env.NCP_STORAGE_BUCKET_NAME;
    const object_name = `${Date.now().toString()}-${file.originalname}`;
    const options = {
      partSize: 5 * 1024 * 1024,
    };

    try {
      return await S3.upload(
        {
          Bucket: bucket_name,
          Body: file.buffer,
          Key: object_name,
          ACL: 'public-read',
        },
        options,
      ).promise();
    } catch (error) {
      throw new HttpException('서버 아이콘 업로드에 실패했습니다.', 403);
    }
  }
}

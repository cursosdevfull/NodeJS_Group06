import multer from 'multer';
import multer_s3 from 'multer-s3';
import AWS from 'aws-sdk';
import yenv from 'yenv';
import { IError } from '../helpers/errors.handler';

AWS.config.update({ region: 'us-east-2' });

const S3 = new AWS.S3();
const env = yenv();

export class UploadMiddleware {
  static S3(fieldName: string, ...mimeTypesAllowed: string[]) {
    return multer({
      limits: {
        fileSize: 8000000,
      },
      storage: multer_s3({
        s3: S3,
        bucket: env.S3.BUCKET_NAME,
        acl: 'public-read',
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key(req: any, file, cb) {
          const mimeType = file.mimetype;
          const isFileAllowed = mimeTypesAllowed.includes(mimeType);

          if (!isFileAllowed) {
            const error: IError = new Error('Invalid file type');
            error.status = 400;
            cb(error);
          } else {
            const partsFile = file.originalname.split('.');
            const newName = Date.now().toString();
            const extension = partsFile[1];
            const newFileName = `${newName}.${extension}`;
            req.body[fieldName] = newFileName;
            cb(null, newFileName);
          }
        },
      }),
    }).single(fieldName);
  }
}

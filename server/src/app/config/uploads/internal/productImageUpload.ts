import path from 'path';

import multer from 'multer';
import AppError from '../../../errors/AppError';

const directory = path.join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'tmp',
  'products'
);

export default {
  directory,
  multer: multer({
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png)$/))
        return cb((new AppError('Invalid upload format') as unknown) as Error);

      return cb(null, true);
    },
    storage: multer.diskStorage({
      destination: directory,
      filename(req, file, cb) {
        console.log(file);

        return cb(null, file.originalname);
      },
    }),
  }),
};

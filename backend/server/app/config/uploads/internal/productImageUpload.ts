import path from 'path';

import multer from 'multer';
import AppError from '../../../errors/AppError';

const directory = path.join('uploads', 'products');

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
        const name = `${Date.now()}_${file.originalname}`;

        return cb(null, name);
      },
    }),
  }),
};

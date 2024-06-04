import multer from 'multer';
// @ts-ignore
import multerS3 from 'multer-s3';
import path from 'path';
import s3 from '../config/aws.config';

const allowedMimeTypes = ['image/jpeg', 'image/png'];

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME! as string,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // @ts-ignore
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `restaurant-images/${Date.now().toString()}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype))  {
      cb(null, true);
    } else {
      // @ts-ignore
      cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
});

export default upload;

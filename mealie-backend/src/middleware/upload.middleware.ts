import AWS from 'aws-sdk';
import multer from 'multer';
// @ts-ignore
import multerS3 from 'multer-s3';
import path from 'path';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadImage = multer({
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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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

export default uploadImage;

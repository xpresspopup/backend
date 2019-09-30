import fs from 'fs-extra';
import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      fs.mkdirsSync('files/images');
      cb(null, './files/images/');
      setTimeout(() => {
        // fs.emptyDirSync('files/');
      }, 1000 * 2);
    } else if (file.mimetype === 'application/pdf') {
      fs.mkdirsSync('files/resume');
      cb(null, './files/resume/');
      setTimeout(() => {
        // fs.emptyDirSync('files/');
      }, 1000 * 2);
    } else {
      cb(
        { message: 'this file is neither a video or image file, or pdf' },
        false,
      );
    }
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

export default upload;

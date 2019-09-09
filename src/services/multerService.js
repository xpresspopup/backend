import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, './files/images/');
    } else {
      cb({ message: 'this file is neither a video or image file' }, false);
    }
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

export default upload;

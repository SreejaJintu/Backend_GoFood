import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      return cb(new Error('Uploads folder does not exist'));
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;

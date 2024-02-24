import multer from 'multer';
//Migrated
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;

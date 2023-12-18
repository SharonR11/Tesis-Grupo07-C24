import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../fotos'); // Ruta donde se guardarán las fotos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre original del archivo
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no permitido'), false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });

import multer from 'multer'
import path from 'path'

export const getStorageMulter = () => {
  return multer.diskStorage({
    destination: path.resolve('uploads'),
    filename: function (req, file, callback) {
      callback(null, 'temp-' + file.originalname)
    },
  })
}

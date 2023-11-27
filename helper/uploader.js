const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = {
    uploader: (directory) => {
      //Lokasi utama penyimpananan file
      const defaultDir = "./public";
  
      //Konfigurasi multer
      const storageUploader = multer.diskStorage({
        destination: (req, file, cb) => {
          const pathDir = directory ? defaultDir + directory : defaultDir;
          //Pemeriksaan directory
          if (fs.existsSync(pathDir)) {
            //Jika directory ditemukan maka parameter cb dari destination akan menyimpan file
            // console.log(`Directory ${defaultDir} Exist`);
            cb(null, defaultDir);
          } else {
            fs.mkdir(pathDir, (err) => {
              if (err) {
                console.log("Error create directory", err);
              }
              return cb(err, pathDir);
            });
          }
        },
        filename: (req, file, cb) => {
          //Menambahkan file yang akan disimpan
          cb(null, `${Date.now()}--${file.originalname}`);
        },
      });
  
      const fileFilter = (req, file, cb) => {
        console.log("check file from requeust client", file);
        if (
          file.originalname.toLowerCase().includes("png") ||
          file.originalname.toLowerCase().includes("jpg") ||
          file.originalname.toLowerCase().includes("jpeg")
        ) {
          cb(null, true);
        } else {
          cb(new Error("Your File Extension are denied. only PNG or JPG/JPEG", false));
        }
      };
      return multer({ storage: storageUploader, fileFilter });
    },
  };
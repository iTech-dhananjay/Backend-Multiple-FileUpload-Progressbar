import multer from "multer"

//  console.log("upload") 
const  storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      return  cb(null, file.fieldname + '-' + Date.now()+file.originalname)
    }
});
  
const upload = multer({ storage: storage });

export default upload


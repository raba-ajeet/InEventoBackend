const multer = require('multer');
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname);
    }
})

var fileFilter = (req,file,cb) => {
    if(file.mimetype==='images/jpeg' || file.mimetype === 'images/png' ||  file.mimetype==='images/jpg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}
module.exports =  {storage:storage};
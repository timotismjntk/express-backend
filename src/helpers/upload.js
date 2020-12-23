const responseStandard = require('../helpers/response')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        if(!file){
            return cb(new Error('Image cant be null'), false);
        }
        
        cb(null, 'assets/uploads')
    },
    filename: (req, file, cb)=>{
        const ext = file.originalname.split('.')[file.originalname.split('.').length-1]
        console.log(req.files.length)
        const fileName = `${req.user.id}_${new Date().getTime().toString().concat('.').concat(ext)}`
        cb(null, fileName)
    }
})

let fileFilter = (req, file, cb) => {
    console.log(!file)
    var allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/PNG', 'image/svg+xml'];
     if (allowedMimes.includes(file.mimetype)) {
        return cb(null, true)
     }
        return cb(new Error('Invalid file type. Only image files are allowed.'), false);
}

module.exports = multer({storage, fileFilter, limits: { fileSize: 5000000 }}).array('picture', 4)
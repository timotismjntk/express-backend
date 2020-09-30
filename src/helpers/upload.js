const responseStandard = require('../helpers/response')
const multer = require('multer')
const upload = multer()
// const options = {
//     dest: 'assets/uploads'
// }


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'assets/uploads')
    },
    filename: (req, file, cb)=>{
        // cb(null, file.originalname) // file.originalname adalah penamaan file/foto yang akan diupload
        const ext = file.originalname.split('.')[file.originalname.split('.').length-1]
        // console.log(ext)
        const fileName = `${req.user.id}_${new Date().getTime().toString().concat('.').concat(ext)}`
        cb(null, fileName)
    },
    isNull: (req, file, cb)=> {
        // console.log(file.length)
        if ([file].length === 0) {
            return cb(null, false);
        } else if([file].length > 4) {
            return cb(null, false);
        }
    }
})

    

let fileFilter = (req, file, cb) => {
    console.log(req.files.length === 3)
    var allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/PNG'];
    // console.log(req.files.length === req.files[0].fieldname.length)
    if (req.files.length === 5) {
        file.fieldname = 'changed'
        const fieldname = file.fieldname
        console.log('berubah')
        return cb(null, fieldname)
    }
    // console.log(cekFile.slice(cekFile.indexOf('.'), cekFile.length))
     if (allowedMimes.includes(file.mimetype)) {
        return cb(null, true)
     } 
     else if (!(allowedMimes.includes(file.mimetype))) {
        file.mimetype = 'error'
        const mimetype = file.mimetype
        return cb(null, mimetype);
     }
}


module.exports = multer({storage, fileFilter}).array('picture', 4)
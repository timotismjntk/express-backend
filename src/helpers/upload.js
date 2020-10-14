const responseStandard = require('../helpers/response')
const multer = require('multer')
// const options = {
//     dest: 'assets/uploads'
// }


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        if(!file){
            console.log('payah')
            return cb(new Error('Image cant be null'), false);
        }
        
        cb(null, 'assets/uploads')
    },
    filename: (req, file, cb)=>{
        // cb(null, file.originalname) // file.originalname adalah penamaan file/foto yang akan diupload
        const ext = file.originalname.split('.')[file.originalname.split('.').length-1]
        console.log(req.files.length)
        const fileName = `${req.user.id}_${new Date().getTime().toString().concat('.').concat(ext)}`
        cb(null, fileName)
    }
})

let fileFilter = (req, file, cb) => {
    console.log(!file)
    // console.log(req.files[0].fieldname  === 'picture')
    var allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/PNG', 'image/svg+xml'];
    // console.log(file)
    
    // console.log(cekFile.slice(cekFile.indexOf('.'), cekFile.length))
     if (allowedMimes.includes(file.mimetype)) {
        return cb(null, true)
     }
    //  else if (!(allowedMimes.includes(file.mimetype))) {
        //  req.files = {
        //     //  ...req.files,
        //     error: 'error'
        //  }
        // file.mimetype = 'error'
        // const mimetype = file.mimetype
        return cb(new Error('Invalid file type. Only image files are allowed.'), false);
    //  }
}

// let isNull = (req, file, cb) =>{
//     console.log(123456)
    
// }


module.exports = multer({storage, fileFilter, limits: { fileSize: 2000000 }}).array('picture', 4)
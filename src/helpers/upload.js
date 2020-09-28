const responseStandard = require('../helpers/response')
const multer = require('multer')

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
    }
})

let fileFilter = (req, file, cb) => {
    var allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
    // console.log(req.body)
    // const cekFile = file.originalname
    // console.log(file)
    // console.log(cekFile.slice(cekFile.indexOf('.'), cekFile.length))
     if (allowedMimes.includes(file.mimetype)) {
        return cb(null, true)
     } 
     else if (!(allowedMimes.includes(file.mimetype))) {
        return cb(null, false);
     }

    //  if (req)



// let sizeFilter = (req, file, cb)=> {
//     if(file.size <= 500000 ) {
//         return cb(null, true);
//     } else {
//         return cb(null, false);
//     }
}

module.exports = multer({storage, fileFilter})
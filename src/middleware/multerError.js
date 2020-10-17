const multer = require('multer')
const upload = multer()


module.exports = {
    uploaded: async (req, res) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log('error my brother')
            } else if (err) {
            // An unknown error occurred when uploading.
            console.log('error my brother')
            }
        
            // Everything went fine.
        })
    }
}

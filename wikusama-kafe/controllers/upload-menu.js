/**load library multer */
const multer = require(`multer`)

/**config od storage */
const configStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null,`./menu_image`)
    },
    filename:(request, file, callback) => {
        /**arjak.jpg (pict file can be change) */
        callback(null, `image-${Date.now()}-${file.originalname}`)
    }
})

/**define func upload */
const upload = multer({
    storage: configStorage,
    /**file filter */
    fileFilter:(request, file, callback) => {
        /**define accepted extension */
        const extension = [`image/jpg`,`image/png`,`image/jpeg`]

        /**check the extension */
        if(! extension.includes(file.mimetype)){
            /**refuse upload */
            callback(null, false)
            return callback(null, `Invalid type of file`)
        }

        /**filter size limit */
        /**define max size */
        const maxSize = (1 * 1024 * 1024)
        const fileSize = request.header[`content-length`]

        if(fileSize > maxSize){
            /** refuse upload */
            callback(null, false)
            return callback(null,`The file is to large`)
        }

        /**accepted upload */
        callback(null,true)
    }
})

/**export func */
module.exports = upload
// load model of menu
const menuModel = require(`../models/index`).menu
const { response, request } = require("express")
const joi = require(`joi`)
const { Op } = require("sequelize")

/*load upload func */
const upload = require(`./upload-menu`)

/**load path and fs library */
const path = require(`path`)
const fs = require(`fs`)

/**create func to validate data menu */
const validateMenu = (input) => {
    /**define rules of menu */
    let rules = joi.object().keys({
        nama_menu: joi.string().required(),
        jenis: joi.string().valid(`makanan`, `minuman`).required(),
        deskripsi: joi.string().required(),
        harga: joi.number().required()

    })

    /**get error of validation */
    let { error } = rules.validate(input)
    if (error) {
        let message = error.details.map(item => item.message).join(`,`)

        return {
            status: false,
            message: message
        }
    }

    return {
        status: true
    }

}

/**create and export func to get add menu */
exports.addMenu = async (request, response) => {
    try {
        const uploadMenu = upload.single(`gambar`)
        uploadMenu(request, response, async error => {
            if (error) {
                return response.json({
                    status: false,
                    message: error
                })
            }
            /** check existing file*/
            if (!request.file) {
                return response.json({
                    status: false,
                    message: `Nothing file to upload`
                })
            }
            /**check validation of input */
            let resultValidation = validateMenu(request.body)
            if (resultValidation.status == false) {
                return response.json({
                    status: false,
                    message: resultValidation.message
                })
            }

            /*slipping filename in req.body */
            request.body.gambar = request.file.filename

            /**insert menu using model */
            await menuModel.create(request.body)

            /**give responsse */
            return response.json({
                status: true,
                message: `Data menu telah ditambahkan`
            })

        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/**create and export func to get all menu */
exports.getMenu = async (request, response) => {
    try {
        /**get all menu using model */
        let result = await menuModel.findAll()
        /**give response */
        return response.json({
            status: true,
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** create and export func to filter menu */
exports.findMenu = async (request, response) => {
    try {
        let keyword = request.body.keyword
        let result = await menuModel.findAll({
            where: {
                [Op.or]: {
                    nama_menu: { [Op.like]: keyword },
                    jenis: { [Op.like]: keyword },
                    deskripsi: { [Op.like]: keyword }
                }
            }
        })
        /**give response */
        return response.json({
            status: true,
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/**create exsport func to update menu */
exports.updateMenu = async (request, response) => {
    try {
        const uploadMenu = upload.single(`gambar`)
        uploadMenu(request, response, async error => {
            if (error) {
                return response.json({
                    status: false,
                    message: error
                })
            }

            /**get id menu yang akan di rubah */
            let id_menu = request.params.id_menu

            /**grab menu based on selected id menu */
            let selectedMenu = await menuModel
                .findOne({ where: { id_menu: id_menu } })

            /**check if update within upload `gambar` */
            if (request.file) {
                let oldFilename = selectedMenu.gambar
                /**create path of file */
                let pathFile = path.join(__dirname, `../menu_image`, oldFilename)

                /**check the exsisting old file */
                if (fs.existsSync(pathFile)) {
                    /**delete the old file */
                    fs.unlinkSync(pathFile, error => {
                        console.log(error)
                    })
                }
                /**insert the file name to request.body */
                request.body.gambar = request.file.filename
            }
            /**update menu using model */
            await menuModel.update(request.body, { where: { id_menu: id_menu } })

            /**give response */
            return response.json({
                status: true,
                message: `Data menu telah diupdate`
            })
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/**create and export to func delete menu */
exports.deleteMenu = async (request, response) => {
    try {
        /**get id that will be delete */
        let id_menu = request.params.id_menu
        /**grab menu based on id */
        let selectedMenu = await menuModel
            .findOne({ where: { id_menu: id_menu } })

        /**define  a path of file */
        let pathFile = path.join(
            __dirname,
            `../menu_image`,
            selectedMenu.gambar)

        /**cek existing fille */
        if (fs.existsSync(pathFile)) {
            /**delete file */
            fs.unlinkSync(pathFile, error => {
                console.log(error);
            })
        }

        /**delete menu using model */
        await menuModel.destroy({
            where: { id_menu: id_menu }
        })
        /**give response */
        return response.json({
            status: true,
            message: `Data Menu Telah DiHapus`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
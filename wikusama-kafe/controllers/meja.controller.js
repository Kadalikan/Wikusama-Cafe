/**function utk mengllah req
 * dan memberikan response
 */

const { response } = require("express")

/** call model meja */
const mejaModel = require(`../models/index`).meja

/**call joi library */
const joi = require(`joi`)

/**define func to validate to input of meja */
const validateMeja = async (input) => {
    /**define rules of validation */
    let rules = joi.object().keys({
        nomor_meja: joi.string().required(),
        status: joi.boolean().required()
    })

    /**validation proses */
    let { error } = rules.validate(input)

    if (error) {
        /**arrange a error message of validation */
        let message = error
            .details
            .map(item => item.message)
            .join(`,`)
        return {
            status: false,
            message: message
        }
    }
    return {status: true}
}

/**create and export function to load meja */
exports.getMeja = async (request, response) => {
    try {
        /**call meja from db using model */
        let meja = await mejaModel.findAll()

        /**give response within meja */
        return response.json({
            status: true,
            data: meja
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/**create and export func to filter avail meja */
exports.availableMeja = async (request, response) => {
    try {
        /**define parameter for status true */
        let param = { status: true }

        /**get data meja form db with  defined filter */
        let meja = await mejaModel.findAll({ where: param })

        /**give response */
        return response.json({
            status: true,
            data: meja
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}


/**create an export func to add new meja */
exports.addMeja = async (request, response) => {
    try {

        /**validate data */
        let resultValidation = validateMeja(request.body)
        if(resultValidation.status == false){
            return response.json({
                status:false,
                message:resultValidation.message
            })
        }

        /**insert data meja to db using model */
        await mejaModel.create(request.body)
        /**give response to tell that insert has successed */
        return response.json({
            status:true,
            message:`Data meja berhasil ditambahkan`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/**create and export func to update meja */
exports.updateMeja = async(request,response) => {
    try {
        /**get param for update */
        let id_meja = request.params.id_meja

        /**validate data meja */
        let resultValidation = validateMeja(request.body)
        if(resultValidation.status == false){
            return response.json({
                status: false,
                message: resultValidation.message
            })
        }

        /**run update meja using model*/
        mejaModel.update(request.body,{
            where: {id_meja: id_meja}
        })

        /**give response  */
        return response.json({
            staus:true,
            message: `Data meja berhasil diubah`
        })


    } catch (error) {
        return response.json({
            status:false,
            message:error.message
        })
    }
}

/**create func and export func to delete meja */
exports.deleteMeja = async (request,response) => {
    try {
        /**get id meja that will be delete */
        let id_meja = request.params.id_meja

        /**run delete meja using model */
       await mejaModel.destroy({
            where:{id_meja: id_meja}
        })

        /**give a response */
        return response.json({
            status: true,
            message: `Data meja berhasil di hapus`
        })


    } catch (error) {
        return response.json({
            status: false,
            message:error.message
        })
    }
}

 
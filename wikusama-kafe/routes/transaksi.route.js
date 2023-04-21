/**load express */
const express = require(`express`)
const app = express()

/** load controller of transaksi */
const transaksiController = require(`../controllers/transaksi.controller`)

/**allow to rean json on body req */
app.use(express.json())

/**create route to get all transaksi */
app.get(`/transaksi`, transaksiController.getTransaksi)

/**create route to add transaksi */
app.post(`/transaksi`,transaksiController.addTransaksi)

/** create route to edit transaksi */
app.put(`/transkasi/:id_transaksi`,transaksiController.updateTransaksi)

/**create route to delete */
app.delete(`/transaksi/:id_transaksi`,transaksiController.deleteTransaksi)

/**export app */
module.exports = app
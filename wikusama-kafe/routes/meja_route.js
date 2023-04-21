const express = require(`express`)
const app = express()

/**allow to read a req with json type */
app.use(express.json())

/**load a controller of meja */
const mejaController = require(`../controllers/meja.controller`)

/**route to get all data meja */
app.get(`/meja`, mejaController.getMeja)

/**route to get avail meja */
app.get(`/meja/available`, mejaController.availableMeja)

/**route to add new meja */
app.post(`/meja`, mejaController.addMeja)

/**route to update meja */
app.put(`/meja/:id_meja`, mejaController.updateMeja)

/**route to delete */
app.delete(`/meja/:id_meja`, mejaController.deleteMeja)

/**export app object */
module.exports = app
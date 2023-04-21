const express = require(`express`)
const app = express()

/**load controller menu */
const menuController = require(`../controllers/menu.controller`)

/**create route for add menu */
app.post (`/menu`, menuController.addMenu)

/**create route to get all menu */
app.get(`/menu`,menuController.getMenu)

/**create route for search menu */
app.post(`/menu/find`,menuController.findMenu)

/**create route to edit menu */
app.put(`/menu/:id_menu`,menuController.updateMenu)

/**create route to delete menu */
app.delete(`/menu/:id_menu`,menuController.deleteMenu)

/**export app */
module.exports = app
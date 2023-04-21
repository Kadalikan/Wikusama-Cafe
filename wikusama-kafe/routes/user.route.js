/**load express library */
const express = require(`express`)
/**create onject of express */
const app = express()

/**allow to read a request from body with json format */
app.use(express.json())

/**load controller of user */
const userController = require(`../controllers/user.controller`)

/**create route for get all user */
app.get(`/user`, userController.getUser)

/**create route for searcjh */
app.post(`/user/find`, userController.findUser)

/** create route for add user */
app.post(`/user`, userController.addUser)

/**create route for edit */
app.put(`/user/:id_user`, userController.updateUser)

/**create route for delete */
app.delete(`/user/:id_user`, userController.deleteUser)

module.exports = app
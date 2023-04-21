const express = require(`express`)
const app = express()

/**define port for the server */
const PORT = 8000

/**load route of user */
const userRoute = require(`./routes/user.route`)
/**load a route of meja */
const mejaRoute = require(`./routes/meja_route`)
/**load a route of menu */
const menuRoute = require(`./routes/menu.route`)
/**load a route of transaksi */
const transaksiRoute = require(`./routes/transaksi.route`)
/**register route of transaksi */
app.use(transaksiRoute)
/**register route of meja */
app.use(mejaRoute)

/**register route of user */
app.use(userRoute)

/**register route of menu */
app.use(menuRoute)

/**run the server  */
app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
})
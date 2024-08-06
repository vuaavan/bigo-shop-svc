const express = require("express")
const morgan = require("morgan")
// const bodyParser = require('body-parser');
const { sequelize } = require("./models")
const dishRoutes = require("./routes/dishRoutes")

const app = express()
const port = process.env.PORT || 3000

app.use(morgan("dev"))
app.use(express.json())
app.use("/api", dishRoutes)

app.listen(port, async () => {
  console.log(`Server running on port ${port}`)
  try {
    await sequelize.authenticate()
    console.log("Database connection established.")
    await sequelize.sync()
    console.log("Database synchronized.")
  } catch (err) {
    console.error("Unable to connect to the database:", err)
  }
})

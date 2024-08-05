const { Sequelize, DataTypes } = require("sequelize")
const path = require("path")
const fs = require("fs")

const env = process.env.NODE_ENV || "development"
const config = require("../config/config.json")[env]
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

const db = {}

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

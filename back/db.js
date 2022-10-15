const { Sequelize } = require("sequelize")

const db = new Sequelize(`postgres://postgres:nintendo3DS@localhost:3001/prueba`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

module.exports = {
    conn: db
}
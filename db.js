const { Sequelize } = require("sequelize");

const db = new Sequelize("user-management", "root", "", {
    host: "localhost", 
    port: 3306, 
    dialect: "mysql"
});

module.exports = db;

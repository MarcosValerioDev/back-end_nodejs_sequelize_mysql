const Sequelize = require('sequelize');
const dbConfig = require("../config/dbConfig");
const connection = new Sequelize(dbConfig);
const User = require('../models/user');

User.init(connection);

module.exports = connection;
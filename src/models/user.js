const { Model, DataTypes } = require('sequelize');

class Users extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
        }, { sequelize })
    }
}

module.exports = Users;
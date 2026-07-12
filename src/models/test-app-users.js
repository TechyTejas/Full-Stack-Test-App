const sequelize = require('../static/js/utils/db-connection');
const { DataTypes } = require('sequelize');

const TestAppUsers = sequelize.define(
    'test_app_users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
        {
            timestamps: false,
        }
);

module.exports = TestAppUsers;
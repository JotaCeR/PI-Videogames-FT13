const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('genre', {
    name: {
          type: DataTypes.STRING,
        },
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
        },
    });
};
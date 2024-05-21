
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Station extends Model {}

Station.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Station',
  tableName: 'stations',
});

module.exports = Station;

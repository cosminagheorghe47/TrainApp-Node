const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Station = require('./Station');

class Train extends Model {}

Train.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureStationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Station,
      key: 'id',
    },
  },
  arrivalStationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Station,
      key: 'id',
    },
  },
  dateTimeDeparture: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  dateTimeArrival: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  emptySeats:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Train',
  tableName: 'trains',
});

Station.hasMany(Train, { foreignKey: 'departureStationId' });
Train.belongsTo(Station, { foreignKey: 'departureStationId' });

Station.hasMany(Train, { foreignKey: 'arrivalStationId' });
Train.belongsTo(Station, { foreignKey: 'arrivalStationId' });

module.exports = Train;

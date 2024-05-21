const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Train = require('./Train');

class Booking extends Model {}

Booking.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  trainId: {
    type: DataTypes.INTEGER,
    references: {
      model: Train,
      key: 'id',
    },
  },
  seatNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Booking',
  tableName: 'bookings',
});

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Train.hasMany(Booking, { foreignKey: 'trainId' });
Booking.belongsTo(Train, { foreignKey: 'trainId' });

module.exports = Booking;

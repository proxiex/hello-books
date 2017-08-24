'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    photo: {
      type: DataTypes.TEXT
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    membership: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Silver'
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'User',
      allowNull: false
    },
    borrowed: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: (models) => {
        users.hasMany(models.borrow, {
          foereignKey: 'userId'
        })
      }
    }
  })
  return users
}

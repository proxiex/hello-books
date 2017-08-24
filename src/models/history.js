'use strict'
module.exports = (sequelize, DataTypes) => {
  const history = sequelize.define('history', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_collected: {
      type: DataTypes.DATE,
      allowNull: false
    },

    date_returned: {
      type: DataTypes.DATE
    },

    date_due: {
      type: DataTypes.DATE,
      allowNull: false
    },

    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        history.belongsTo(models.book, {
          foreignKey: 'bookId'
        })
        history.belongsTo(models.users, {
          foreignKey: 'userId'
        })
      }
    }
  })
  return history
}

'use strict'
module.exports = (sequelize, DataTypes) => {
  const history = sequelize.define('history', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      }
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
  })
  history.associate = (models) => {
    history.belongsTo(models.book, {
      foreignKey: 'bookId',
      as: 'bookInfo'
    })

    history.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'userDetails'
    })
  }
  return history
}

'use strict'
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    ISBN: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })
  book.associate = (models) => {
    book.hasMany(models.history, {
      foreignKey: 'bookId',
      as: 'bookInfo'
    })
  }
  return book
}

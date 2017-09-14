'use strict'
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    question: DataTypes.TEXT
  })
  return question
}

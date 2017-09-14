'use strict'
module.exports = (sequelize, DataTypes) => {
  var answer = sequelize.define('answer', {
    q_id: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  })

  answer.associate = (models) => {
    answer.belongsTo(models.question, {
      through: 'question',
      foreignKey: 'q_id'
    })
  }
  return answer
}

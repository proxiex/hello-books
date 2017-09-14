'use strict'

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // Todo.hasMany(models.TodoItem, {
        //
        // });
      }
    }
  })
  return category
}

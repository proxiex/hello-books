'use strict';
module.exports = function(sequelize, DataTypes) {
  const health = sequelize.define('health', {
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    before_due: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    after_due: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return health;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word2vec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Word2vec.init({
    word: DataTypes.STRING,
    move_x: DataTypes.DOUBLE,
    move_y: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'word2vec',
    underscored: true,
    timestamps: false,
  });
  return Word2vec;
};
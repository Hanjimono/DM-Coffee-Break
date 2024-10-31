import path from "path";

const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, "database.sqlite")
});
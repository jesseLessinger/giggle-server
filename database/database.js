const Sequelize = require('sequelize');

const DB_NAME = process.env.DB_NAME || 'giggle';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_HOST = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false

});

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING
  }, 
  email: {
    type: Sequelize.STRING
  }
}, {
  // options
});


sequelize.sync({force: false})
.then(()=>console.log('database connection successful'))
.catch(console.log)

module.exports = { User };
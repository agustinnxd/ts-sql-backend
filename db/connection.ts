import { Sequelize } from 'sequelize'

const db = new Sequelize('node', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;
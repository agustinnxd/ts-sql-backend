import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('node', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
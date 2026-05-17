import { Sequelize } from 'sequelize';
import sequelize from './sequelize.config.js';

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("database connected and running");
        await sequelize.sync({ alter: true });
        console.log("database synchronized");
    } catch (error) {
        console.log("database connection error", error);
        process.exit(1);
    }
}

export const dataBase = sequelize;
export { sequelize };
export default connectDatabase;
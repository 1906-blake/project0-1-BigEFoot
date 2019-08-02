import { Pool } from 'pg';

const connectionConfiguration = {
    user: process.env.PROJECT_DB_USERNAME,
    host: process.env.PROJECT_DB_URL || 'localhost',
    database: process.env.PROJECT_DB_NAME || 'postgres',
    password: process.env.PROJECT_DB_PASSWORD,
    port: +process.env.PROJECT_DB_PORT || 5432,
    max: 5
}
 console.log(connectionConfiguration);
export const connectionPool = new Pool(connectionConfiguration)
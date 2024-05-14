import {Knex} from 'knex';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

if (typeof process.env.DB_PASSWORD !== 'string') {
    console.error('Database password is not set correctly');
    process.exit();
}

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: './src/db/migrations'
        },
        seeds: {
            directory: './src/db/seeds'
        }
    }
    // Add other environments like 'production' as needed
};

export default knexConfig;

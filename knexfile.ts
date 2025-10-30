// knexfile.ts
import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config(); // <--- PRECISA DESTA LINHA PARA LER O .env

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT, // <--- LENDO A VARIÁVEL
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: './src/database/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/database/seeds',
      extension: 'ts',
    },
  },
};

export default config;
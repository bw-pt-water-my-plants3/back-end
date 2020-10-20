const pgConnection = process.env.DATABASE_URL || 'postgresql://postgres@localhost/events';

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './data/users_plants.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};

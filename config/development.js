module.exports = {
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: {
    origins: ['*','http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: 'pg',
    host: 'localhost',
    port: 5432,
    name: 'Nomad-backtesting',
  },
};
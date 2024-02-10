const knex = require('knex');
const {
  getLogger
} = require('../core/logging');

const config = require('config');
const {
  join
} = require('path');

const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_NAME = config.get('database.name');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');

let knexInstance;

async function initializeData() {
  const logger = getLogger();
  logger.info('Initializing connection to the database');

  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      insecureAuth: isDevelopment,
    },
    migrations: {
      tableName: 'knex_meta',
      directory: join('src', 'data', 'migrations')
    },
  };

  knexInstance = knex(knexOptions);

  try {
    await knexInstance.raw('SELECT 1+1 AS result');
  } catch (error) {
    logger.error(error.message, {
      error
    });
    throw new Error('Could not initialize the data layer');
  }

  try {
    await knexInstance.migrate.latest();
  } catch (error) {
    logger.error('Error while migrating the database', {
      error,
    });

    throw new Error('Migrations failed, check the logs');
  }


  return knexInstance;
}

function getKnex() {
  if (!knexInstance)
    throw new Error(
      'Please initialize the data layer before getting the Knex instance'
    );
  return knexInstance;
}

const tables = Object.freeze({
  user: 'user',
});

module.exports = {
  initializeData,
  getKnex,
  tables,
};
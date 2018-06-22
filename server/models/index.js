import fs from 'fs';
import dotEnv from 'dotenv';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/db';

dotEnv.config();

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const configg = config[env];
const db = {};

let sequelize;
const { DATABASE_URL } = process.env;

if (DATABASE_URL) {
  const match = DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: true
  });
} else {
  sequelize = new Sequelize(
    configg.database,
    configg.username,
    configg.password,
    configg
  );
}


fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
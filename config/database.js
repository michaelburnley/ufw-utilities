import Sequelize from "sequelize";
import glob from "glob";
import path from "path";

const models = {};

glob.sync("./config/models/*.js").forEach(function (file) {
  const value = path.basename(file, path.extname(file));
  models[value] = require(path.resolve(file)).default;
});

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST: host,
  DB_EXTERNAL,
} = process.env;

const port = DB_EXTERNAL || "3306";
const dialect = "mysql";

module.exports = async () => {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host,
    port,
    dialect,
    logging: false,
  });

  try {
    await sequelize.authenticate();

    const associations = [];

    for (const key of _.keys(models)) {
      const { attributes, options } = models[key];

      const model_name = _.capitalize(key);

      global[model_name] = sequelize.define(key, attributes, options);
      associations.push(models[key].associations);

      await global[model_name].sync();
    }

    global[`db`] = sequelize;

    _.each(associations, (association) => {
      association();
    });

    return;
  } catch (err) {
    return console.error(`Unable to connect to the database: ${err}`);
  }
};

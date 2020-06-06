const R = require("ramda");

const db = require("../config/db");

const getMongoUrlCOnnect = () => {
  return R.compose(
    R.replace(":userName", db.userName),
    R.replace(":password", db.password),
    R.replace(":dbName", db.dbName)
  )(db.url);
};

const getClusterDatabase = (database) => database.db(db.dbName);

module.exports = {
  getMongoUrlCOnnect,
  getClusterDatabase,
};

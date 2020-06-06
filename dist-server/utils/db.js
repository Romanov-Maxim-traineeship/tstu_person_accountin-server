"use strict";

var R = require("ramda");

var db = require("../config/db");

var getMongoUrlCOnnect = function getMongoUrlCOnnect() {
  return R.compose(R.replace(":userName", db.userName), R.replace(":password", db.password), R.replace(":dbName", db.dbName))(db.url);
};

var getClusterDatabase = function getClusterDatabase(database) {
  return database.db(db.dbName);
};

module.exports = {
  getMongoUrlCOnnect: getMongoUrlCOnnect,
  getClusterDatabase: getClusterDatabase
};
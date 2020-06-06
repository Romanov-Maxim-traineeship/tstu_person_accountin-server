import { compose, replace } from "ramda";

import db from "../config/db";

const getMongoUrlCOnnect = () => {
  return compose(
    replace(":userName", db.userName),
    replace(":password", db.password),
    replace(":dbName", db.dbName)
  )(db.url);
};

const getClusterDatabase = (database) => database.db(db.dbName);

export { getMongoUrlCOnnect, getClusterDatabase };

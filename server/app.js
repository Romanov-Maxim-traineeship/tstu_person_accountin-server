import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { MongoClient } from "mongodb";
import pdf from "express-pdf";

// import usersRouter from "./routes/users";

import indexRouter from "./routes/index";
import { getMongoUrlCOnnect, getClusterDatabase } from "./utils/db";

var app = express();

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(pdf);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "../public")));

const client = new MongoClient(getMongoUrlCOnnect(), {
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});

client.connect((err, database) => {
  if (err) return console.log(err);
  app.use("/", indexRouter(getClusterDatabase(database)));
});
// app.use("/users", usersRouter);

export default app;

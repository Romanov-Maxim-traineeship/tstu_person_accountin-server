import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { MongoClient } from "mongodb";
// import usersRouter from "./routes/users";

import indexRouter from "./routes/index";
import { getMongoUrlCOnnect, getClusterDatabase } from "./utils/db";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "../public")));

const client = new MongoClient(getMongoUrlCOnnect(), {
	promiseLibrary: global.Promise,
	useUnifiedTopology: true
});

client.connect((err, database) => {
	if (err) return console.log(err);
	app.use("/", indexRouter(getClusterDatabase(database)));
});
// app.use("/users", usersRouter);

export default app;

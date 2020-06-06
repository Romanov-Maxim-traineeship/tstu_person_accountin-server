"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongodb = require("mongodb");

var _index = _interopRequireDefault(require("./routes/index"));

var _db = require("./utils/db");

// import usersRouter from "./routes/users";
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])()); // app.use(express.static(path.join(__dirname, "../public")));

var client = new _mongodb.MongoClient((0, _db.getMongoUrlCOnnect)(), {
  promiseLibrary: global.Promise,
  useUnifiedTopology: true
});
client.connect(function (err, database) {
  if (err) return console.log(err);
  app.use("/", (0, _index["default"])((0, _db.getClusterDatabase)(database)));
}); // app.use("/users", usersRouter);

var _default = app;
exports["default"] = _default;
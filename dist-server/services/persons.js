"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var COLLECTION_NAME = "collection_name";

var personsDbCollectionActions = function personsDbCollectionActions(db) {
  var addNewPerson = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(person) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return db.collection(COLLECTION_NAME).insertOne(person);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function addNewPerson(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    addNewPerson: addNewPerson
  };
};

module.exports = {
  personsDbCollectionActions: personsDbCollectionActions
};
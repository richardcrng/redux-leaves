"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "makeActionCreator", {
  enumerable: true,
  get: function get() {
    return _dist.makeActionCreator;
  }
});
Object.defineProperty(exports, "getState", {
  enumerable: true,
  get: function get() {
    return _dist.getState;
  }
});
Object.defineProperty(exports, "resetState", {
  enumerable: true,
  get: function get() {
    return _dist.resetState;
  }
});
Object.defineProperty(exports, "updateState", {
  enumerable: true,
  get: function get() {
    return _dist.updateState;
  }
});
exports.default = void 0;

var _dist = _interopRequireWildcard(require("./dist"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = _dist.default;
exports.default = _default;

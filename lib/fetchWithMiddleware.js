'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = fetchWithMiddleware;

var _applyMiddleware = require('./utils/applyMiddleware.js');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _config = require('./utils/config.js');

var _config2 = _interopRequireDefault(_config);

var _fetchWithConfig = require('./utils/fetchWithConfig.js');

var _fetchWithConfig2 = _interopRequireDefault(_fetchWithConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchWithMiddleware() {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
        middlewares[_key] = arguments[_key];
    }

    return function (uri, opts) {
        return _applyMiddleware2.default.apply(undefined, middlewares)(function (config) {
            return config.then(_fetchWithConfig2.default);
        })(_promise2.default.resolve(new _config2.default({ uri: uri, opts: opts })));
    };
} /*global Promise */
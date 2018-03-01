'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fetchWithConfig;

var _crossFetch = require('cross-fetch');

var _crossFetch2 = _interopRequireDefault(_crossFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchWithConfig(config) {
    return (0, _crossFetch2.default)(config.uri, config.opts);
} /*global fetch */
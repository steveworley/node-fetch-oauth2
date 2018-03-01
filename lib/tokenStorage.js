'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = tokenStorage;

var _preventRaceCondition = require('./utils/preventRaceCondition.js');

var _preventRaceCondition2 = _interopRequireDefault(_preventRaceCondition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenStorage(_ref) {
    var initialToken = _ref.initialToken,
        fetchToken = _ref.fetchToken,
        generateToken = _ref.generateToken;

    var _token = initialToken;

    var _fetchToken = fetchToken ? (0, _preventRaceCondition2.default)(fetchToken) : function () {
        return _promise2.default.reject(new Error('Getting a token from the server is not supported'));
    };
    var _generateToken = generateToken ? (0, _preventRaceCondition2.default)(generateToken) : function () {
        return _promise2.default.reject(new Error('Generating a token on the server is not supported'));
    };

    var getToken = function getToken() {
        if (_token) {
            return _promise2.default.resolve(_token);
        }

        return _fetchToken().then(function (newToken) {
            return _token = newToken;
        }).catch(_generateToken);
    };

    var refreshToken = function refreshToken() {
        _token = undefined;

        return _generateToken().then(function (newToken) {
            return _token = newToken;
        });
    };

    return {
        getToken: getToken,
        refreshToken: refreshToken
    };
} /*global Promise */
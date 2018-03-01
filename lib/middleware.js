'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.addHeaders = addHeaders;
exports.addHost = addHost;
exports.setOAuth2Authorization = setOAuth2Authorization;
exports.authorisationChallengeHandler = authorisationChallengeHandler;

var _fetchWithConfig = require('./utils/fetchWithConfig.js');

var _fetchWithConfig2 = _interopRequireDefault(_fetchWithConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addHeaders(_ref) {
  var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
      name = _ref2[0],
      value = _ref2[1];

  return function (next) {
    return function (config) {
      return next(config.then(function (config) {
        return config.setHeader(name, value);
      }));
    };
  };
} /*global Promise */

function addHost(host) {
  return function (next) {
    return function (config) {
      return next(config.then(function (config) {
        return config.updateUri(function (uri) {
          uri = uri.startsWith('/') ? uri : '/' + uri;
          return host + uri;
        });
      }));
    };
  };
}

function setOAuth2Authorization(_ref3) {
  var getToken = _ref3.getToken;

  return function (next) {
    return function (config) {
      return next(config.then(function (config) {
        return getToken().then(function (token) {
          return config.setAccessToken(token);
        });
      }));
    };
  };
}

function authorisationChallengeHandler(_ref4) {
  var refreshToken = _ref4.refreshToken;
  var test = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : testResponseAuthorisationChallange;

  return function (next) {
    return function (config) {
      return next(config).then(function (response) {
        return test(response).then(function (isAuthorisationChallenge) {
          if (isAuthorisationChallenge) {
            return _promise2.default.all([refreshToken(), config]).then(function (_ref5) {
              var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
                  token = _ref6[0],
                  config = _ref6[1];

              return config.setAccessToken(token);
            }).then(_fetchWithConfig2.default);
          }

          return response;
        });
      });
    };
  };
}

function testResponseAuthorisationChallange(response) {
  if (response.status == 401) {
    return _promise2.default.resolve(true);
  }

  return _promise2.default.resolve(false);
}
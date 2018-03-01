'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (params) {
  for (var _len = arguments.length, middlewares = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    middlewares[_key - 1] = arguments[_key];
  }

  params = (0, _extends3.default)({}, defaults, params);

  var _params = params,
      host = _params.host,
      headers = _params.headers,
      initialToken = _params.initialToken,
      fetchToken = _params.fetchToken,
      generateToken = _params.generateToken,
      tokenConfig = _params.tokenConfig,
      tokenUri = _params.tokenUri;


  generateToken = generateToken(tokenConfig, host, tokenUri);

  var storage = (0, _tokenStorage2.default)({ initialToken: initialToken, fetchToken: fetchToken, generateToken: generateToken });

  if (host) {
    middlewares.push(middleware.addHost(host));
  }

  headers.map(function (header) {
    return middlewares.push(middleware.addHeaders(header));
  });

  // middlewares.push(middleware.authorisationChallengeHandler(storage))
  middlewares.push(middleware.setOAuth2Authorization(storage));

  middlewares = middlewares.reverse();

  return _fetchWithMiddleware2.default.apply(undefined, (0, _toConsumableArray3.default)(middlewares));
};

var _middleware = require('./middleware');

var middleware = _interopRequireWildcard(_middleware);

var _fetchWithMiddleware = require('./fetchWithMiddleware');

var _fetchWithMiddleware2 = _interopRequireDefault(_fetchWithMiddleware);

var _tokenStorage = require('./tokenStorage');

var _tokenStorage2 = _interopRequireDefault(_tokenStorage);

var _crossFetch = require('cross-fetch');

var _crossFetch2 = _interopRequireDefault(_crossFetch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = exports.defaults = {
  fetchToken: function fetchToken() {
    return _promise2.default.resolve(false);
  },
  generateToken: function generateToken(config, host) {
    var uri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'oauth/token';

    uri = uri.startsWith('/') ? uri : '/' + uri;
    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var body, response, token;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              body = (0, _entries2.default)(config).map(function (_ref2) {
                var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
                    key = _ref3[0],
                    val = _ref3[1];

                return key + '=' + encodeURIComponent(val);
              }).join('&');
              _context.next = 3;
              return (0, _crossFetch2.default)(host + uri);

            case 3:
              response = _context.sent;
              _context.next = 6;
              return response.json();

            case 6:
              token = _context.sent;
              return _context.abrupt('return', token);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  },
  host: false,
  headers: [],
  tokenConfig: {},
  tokenUri: 'oauth/token'
};
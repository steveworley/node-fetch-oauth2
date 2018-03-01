'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Config = function () {
  function Config() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$uri = _ref.uri,
        uri = _ref$uri === undefined ? '' : _ref$uri,
        _ref$opts = _ref.opts,
        opts = _ref$opts === undefined ? {} : _ref$opts;

    (0, _classCallCheck3.default)(this, Config);

    this.uri = uri;
    this.opts = opts;
  }

  (0, _createClass3.default)(Config, [{
    key: 'setHeader',
    value: function setHeader(name, value) {
      var uri = this.uri;
      var opts = (0, _deepmerge2.default)(this.opts, {
        headers: (0, _defineProperty3.default)({}, name, value)
      });

      return new Config({ uri: uri, opts: opts });
    }
  }, {
    key: 'setAccessToken',
    value: function setAccessToken(_ref2) {
      var token_type = _ref2.token_type,
          access_token = _ref2.access_token;

      return this.setHeader('Authorization', token_type + ' ' + access_token);
    }
  }, {
    key: 'updateUri',
    value: function updateUri(fn) {
      return new Config({ opts: this.opts, uri: fn(this.uri) });
    }
  }]);
  return Config;
}();

exports.default = Config;
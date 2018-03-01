"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = preventRaceCondition;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preventRaceCondition(fn) {
    var pending = null;

    return function () {
        if (pending) {
            return pending.then(function (result) {
                return _promise2.default.resolve(result);
            });
        }

        pending = fn.apply(undefined, arguments).then(function (result) {
            pending = null;

            return result;
        }).catch(function (error) {
            pending = null;

            throw error;
        });

        return pending;
    };
}
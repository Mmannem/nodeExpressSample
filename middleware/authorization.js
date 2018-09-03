/**
 * Authorization Required middleware.
 */

exports.authorization = function () {
    var hasPrivilege = function (req, res, next) {

    }

    isAuthorized.unless = require("express-unless");
    return isAuthorized;
}
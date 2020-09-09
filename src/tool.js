"use strict";
exports.__esModule = true;
exports.uppercaseToHyphen = void 0;
function uppercaseToHyphen(str) {
    var exr = /[A-Z]/;
    var newStr = str.split("").map(function (letter, index) {
        if (exr.test(letter)) {
            var replaceStr = index === 0 ? letter.toLowerCase() : "-" + letter.toLowerCase();
            return replaceStr;
        }
        else {
            return letter;
        }
    });
    return newStr.join("");
}
exports.uppercaseToHyphen = uppercaseToHyphen;

// let updateFlag = false;
// let setUpdateFlag = function () {
//     updateFlag = true;
// }
// let resetUpdateFlag = function () {
//     updateFlag = false;
// }
// let getUpdateFlag = function () {
//     return updateFlag;
// }

// module.exports = {
//     setUpdateFlag,
//     resetUpdateFlag,
//     getUpdateFlag
// }

let callback = null;
let setCallback = function (newCallback) {
    callback = newCallback;
}
let runCallback = function () {
    if (callback) {
        callback();
    }
}

module.exports = {
    setCallback,
    runCallback
}
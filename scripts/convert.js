const base64Encode = function (str) {
    var base64Str = Buffer.from(str).toString('base64');
    return base64Str;
}

const base64Decode = function (base64Str) {
    var str = Buffer.from(base64Str,'base64').toString();
    return str;
}

const pointData = function (pointUrl) {
    var decodeUrl = decodeURIComponent(pointUrl)
    var data = decodeUrl.match(/data=(\S*)&ext/)[1];
    return data;
}

module.exports = {
    base64Encode,
    base64Decode,
    pointData
};
const scripts_convert = require('./convert');

module.exports = async (page, pointurl) => {
    page.on('requestfinished', requestFinished => {
        var str = requestFinished.url();
        if (str.search(pointurl) != -1) {
            var data = scripts_convert.pointData(str);
            var decodedata = scripts_convert.base64Decode(data);
            if (decodedata.search('wantEvent') != -1) {
                console.log("【 wantEvent 上报连接 】");
                console.log(str);
                console.log("【 wantEvent 上报解码 】");
                console.log(decodedata);
            }
        }
    });
};
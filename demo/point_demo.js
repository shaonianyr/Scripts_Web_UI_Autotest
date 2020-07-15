const scripts_mock = require('../scripts/mock');
const scripts_point = require('../scripts/point');
const scripts_convert = require('../scripts/convert');

module.exports = async (page) => {
    console.log('--------- 模拟埋点上报 ---------');
    scripts_mock(page, 'http://shence_report_url/sa.gif', 200, 'text/plain', 'ok');
    scripts_point(page, 'http://shence_report_url/sa.gif');
    point_data = '{ "event": "wantEvent", "url": "/index", "name": "埋点"}';
    data_url = scripts_convert.base64Encode(point_data);
    point_url = 'http://shence_report_url/sa.gif?data=' + data_url + '&ext=23333';
    await page.goto(point_url);
    await page.waitFor(1000);
};
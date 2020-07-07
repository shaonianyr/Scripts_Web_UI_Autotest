const scripts_abort = require('.././scripts/abort');

module.exports = async (page) => {
    console.log('--------- 模拟 request timeout 处理 ---------');
    scripts_abort(page, 'http://localhost:5000/', "timedout");
    await page.goto('http://localhost:5000/');
    await page.waitFor(1000);
};
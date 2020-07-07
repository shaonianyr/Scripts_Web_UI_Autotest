const scripts_mock = require('.././scripts/mock');

module.exports = async (page) => {
    console.log('------------- mock reponse 处理 -------------');
    scripts_mock(page, 'http://localhost:5000/', 500, 'text/plain', 'Mock body what you want!');
    await page.goto('http://localhost:5000/');
    await page.waitFor(1000);
};
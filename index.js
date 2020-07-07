const puppeteer = require('puppeteer');
const scripts_listen = require('./scripts/listen');
const scripts_abort = require('./scripts/abort');
const scripts_mock = require('./scripts/mock');
const readFileList = require('./getDir/getDir');
const scriptPath = './puppeteer/';
 
(async () => {
    const browser = await puppeteer.launch({
        executablePath: './756035/Chromium.app/Contents/MacOS/Chromium',
        // headless: false
        headless: true
    });
    
    // console.log('-------- 正常监听 request 和 reponse --------');
    // try {
    //     listen_url = 'http://localhost:5000/';
    //     var page = await browser.newPage();
    //     await page.setRequestInterception(true);
    //     scripts_listen(page, listen_url);
    //     await page.goto('http://localhost:5000/');
    //     await page.waitFor(1000);
    //     await page.close();
    // } catch (error) {
    //     await page.close();
    // }

    // console.log('--------- 模拟 request timeout 处理 ---------');
    // try {
    //     timeout_url = 'http://localhost:5000/';
    //     var page = await browser.newPage();
    //     await page.setRequestInterception(true);
    //     scripts_abort(page, timeout_url, "timedout");
    //     await page.goto('http://localhost:5000/');
    // } catch (error) {
    //     await page.close();
    // }

    // console.log('--------- 模拟 request aborted 处理 ---------');
    // try {
    //     aborted_url = 'http://localhost:5000/';
    //     var page = await browser.newPage();
    //     await page.setRequestInterception(true);
    //     scripts_abort(page, aborted_url, "aborted");
    //     await page.goto('http://localhost:5000/');
    // } catch (error) {
    //     await page.close();
    // }

    // console.log('------------- mock reponse 处理 -------------');
    // try {
    //     mock_url = 'http://localhost:5000/';
    //     var page = await browser.newPage();
    //     await page.setRequestInterception(true);
    //     scripts_mock(page, mock_url, 500, 'text/plain', 'Mock body what you want!');
    //     await page.goto('http://localhost:5000/');
    //     await page.waitFor(1000);
    //     await page.close();
    // } catch (error) {
    //     await page.close();
    // }

    var filesList = [];
    readFileList.getDir(scriptPath, filesList);

    for (var i = 0; i < filesList.length; i++) {
        console.log(i + 1, "正在执行", filesList[i].base, "脚本");
        var page = await browser.newPage();
        await page.setRequestInterception(true);
        var customPathFunction = require(scriptPath + filesList[i].base);
        try {
            await customPathFunction(page);
            await page.close();
        } catch (error) {
            await page.close();
        }
    }

    await browser.close();
})();
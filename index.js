const puppeteer = require('puppeteer');
const scripts_listen = require('./scripts/listen');
const scripts_abort = require('./scripts/abort');
const scripts_mock = require('./scripts/mock');
const readFileList = require('./getDir/getDir');
// 演示使用 demo 执行
const scriptPath = './demo/';
// 实际使用 puppeteer 执行
// const scriptPath = './puppeteer/';
 
(async () => {
    const browser = await puppeteer.launch({
        executablePath: './756035/Chromium.app/Contents/MacOS/Chromium',
        // headless: false
        headless: true
    });
    
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
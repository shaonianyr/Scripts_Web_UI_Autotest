module.exports = async (page, url, abortType) => {
    page.on('request', interceptedRequest => {
        var str = interceptedRequest.url()
        if (str.search(url) != -1) {
            console.log("【 正在监听 】");
            if (interceptedRequest.method() === 'GET') {
                console.log(interceptedRequest.method(), interceptedRequest.url());
                interceptedRequest.abort(abortType);
            } else if (interceptedRequest.method() === 'POST') {
                console.log(interceptedRequest.method(), interceptedRequest.url());
                console.log("POSTDATA:\n", interceptedRequest.postData());
                interceptedRequest.abort(abortType);
            } else {
                interceptedRequest.abort(abortType);
            }
        } else {
            interceptedRequest.continue(abortType);
        }
    });
    page.on('requestfailed', requestFailed => {
        var str = requestFailed.url()
        if (str.search(url) != -1) {
            console.log("【 监听结果 】")
            console.log("REQUEST_URL", requestFailed.url());
            console.log("REQUEST_ERROR", requestFailed.failure().errorText);
        }
    });
};
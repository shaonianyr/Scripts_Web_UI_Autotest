module.exports = async (page, url, abortType) => {
    page.on('request', interceptedRequest => {
        if (interceptedRequest.url() === url) {
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
            interceptedRequest.abort(abortType);
        }
    });
    page.on('requestfailed', requestFailed => {
        console.log("【 监听结果 】")
        console.log("REQUEST_URL", requestFailed.url());
        console.log("REQUEST_ERROR", requestFailed.failure().errorText);
    });
};
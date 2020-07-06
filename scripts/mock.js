module.exports = async (page, url, status, contentType, body) => {
    page.on('request', interceptedRequest => {
        if (interceptedRequest.url() === url) {
            console.log("【 正在监听 】");
            if (interceptedRequest.method() === 'GET') {
                console.log(interceptedRequest.method(), interceptedRequest.url());
                interceptedRequest.respond({
                    status: status,
                    contentType: contentType,
                    body: body
                });
            } else if (interceptedRequest.method() === 'POST') {
                console.log(interceptedRequest.method(), interceptedRequest.url());
                console.log("POSTDATA:\n", interceptedRequest.postData());
                interceptedRequest.respond({
                    status: status,
                    contentType: contentType,
                    body: body
                });
            } else {
                interceptedRequest.respond({
                    status: status,
                    contentType: contentType,
                    body: body
                });
            }
        } else {
            iinterceptedRequest.respond({
                status: status,
                contentType: contentType,
                body: body
            });
        }
    });
    page.on('response', async function(response){
        try {
            let message = await response.text();
            console.log("【 监听结果 】");
            console.log("RESPONSE_URL", response.url());
            console.log("RESPONSE_STATUS", response.status(), response.statusText());
            console.log("RESPONSE_BODY\n", message);
        } catch (error) {
            console.log("【 监听结果 】")
            console.log(err)
        }
    });
};
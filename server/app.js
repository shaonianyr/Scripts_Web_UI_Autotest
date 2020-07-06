const express = require('express')
const app = express()
const port = 5000

app.get('/',function (req, res, next) {
    var _data = { id: 1, str: "string", list: [2, 3, 4], dict: { msg: "hello, world" }};
    res.type('application/json');
    res.jsonp(_data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
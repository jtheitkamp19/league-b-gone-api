// Entry point for the API
_ = require('underscore');
ROAST = 'roast';
SUPPORT = 'support';

var RoastUtil = require('./utility/RoastUtil');
var express = require('express');
var settings = require('./settings.json');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/roast', (request, response) => {
    console.log('GET roast request received');
    var id = RoastUtil.getIdForRoast(ROAST, request?.query?.id);
    response.send(RoastUtil.getRoast(ROAST, id));
});

app.post('/roast', (request, response) => {
    console.log('POST roast request received');
    response.send(RoastUtil.saveRoast(ROAST, request.body, require('./modules/roast')));
});

app.get('/support', (request, response) => {
    console.log('GET support request received');
    var id = RoastUtil.getIdForRoast(SUPPORT, request?.query?.id);
    response.send(RoastUtil.getRoast(SUPPORT, id));
});

app.post('/support', (request, response) => {
    console.log('POST support request received');
    response.send(RoastUtil.saveRoast(SUPPORT, request.body, require('./modules/support')));
});

app.listen(settings);
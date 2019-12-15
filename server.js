require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const { init } = require('@sentry/node');
const { logger } = require('./util');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT);
app.use(cors());
// if (app.get('env') == 'development') {
//     logger.log('Initializing sentry');
//     init({ dsn: process.env.sentry_dsn });
// }

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,access_token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/mongodbDemo/v1/readme', express.static(path.join(__dirname, '/readme')));
app.use('/justclick/v1', routes);
app.get('/justclick/v1', (req, res) => {
    res.send('Hello World!');
});

logger.log('App Environment is: ', app.get('env'));

const server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('App is running on port: ', app.get('port'));
});

const used = process.memoryUsage().heapUsed / 1024 / 1024;
const available = process.memoryUsage().heapTotal / 1024 / 1024;
logger.log(`The approximately available memory is: ${Math.round(available * 100) / 100} MB`);
logger.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

'use strict';

global.appBasePath = __dirname;
const moduleName = __filename;


/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
// const multer = require('multer');
// const chalk = require('chalk');
// const lusca = require('lusca');
// const MongoStore = require('connect-mongo')(session);
//const dotenv = require('dotenv');
//const flash = require('express-flash');

const config = require('config');

/**
 * Create Express server.
 */
const app = express();

// For documentation
app.use('/doc', express.static(path.join(__dirname, 'doc')));

// set static files (css and images, etc) location
app.use(express.static('./public'));

//Middlewares
require('middleware')(app);

//Routes
require('route')(app);

//Controllers
require('controller')(app);

//Other dependencies

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'dev') {
    // only use in development
    app.use(errorHandler());
}

/**
 * Start Express server.
 */
start();

start = function () {
    return new Promise((resolve) => {
        const server = app.listen(process.env.PORT || config.port, () => {
            console.log(`[p ${process.pid}] Listening at port ${prop.port}`);
            //console.log(`Started on port ${app.server.address().port}`);
            resolve();
        });
        server.timeout = 600000;
    });
}

const shutdown = function () {
    try {
        await closeFunc();
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
    // await db.close();
    await server.close();

};

// Close the DB connection when pressing Ctrl+C
// process.on('SIGINT', () => {
//     db.end();
//     process.exit(1);
// });


process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);


module.exports = app;


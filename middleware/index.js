var compression = require('compression');
var get_ip = require('ipware')().get_ip;
var guid = require('guid');
var cors = require('cors');

module.exports = function (app) {

    app.use(compression());

    // allow cross origin requests
    // configure to only allow requests from certain origins
    app.use(cors());

    // Associating Client IP with req
    app.use(function (req, res, next) {
        var ip_info = get_ip(req);
        next()
    })

    //Request Data
    app.use(function (req, res, next) {
        req.data = {};
        next();
    });

    // associating correlation id with req 
    app.use(function (req, res, next) {
        var correlationId = guid.create();
        req.correlationId = correlationId;
        req.data.correlationId = correlationId;

        //Unique Request ID from Client/UI.
        req.data.xRequestId = req.headers['x-requestid'];

        //assigning url from req object to res object
        res.originalUrl = req.originalUrl;

        next();
    });

    app.use(cors(corsOptions));

    app.use(bodyParser.json({ limit: '50mb' }));

    app.use(bodyParser.urlencoded({ extended: true }));

    //Request Logger


    //White List APIs - authentication/authorization
    
    // secure your private routes with jwt authentication middleware
    app.all('/private/*', (req, res, next) => auth(req, res, next));

    // fill routes for express application
    app.use('/public', mappedOpenRoutes);
    app.use('/private', mappedAuthRoutes);

    //authentication


    //authorization


    //Error handling


}
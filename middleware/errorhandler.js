
module.exports = function (app) {
    //middleware exception handler
    app.use(function (error, req, res, next) {
        //send error message here
        console.error("Exception Handled: ", error);
        //send response to client here with 500 error
        //res.status(responseToHttpResponseMapper(status));
        res.status(500);
        var requestData = res.req["data"] ? res.req["data"] : null;
        res.setHeader('X-CorrelationId', requestData.correlationId);
        res.json(data);
        res.responseData = data;
        res.end();
        res.finished;
    });
}

//Uncaught exception handler 

process.on('error', function (err) {
    console.log("Process Error : ", err);
});

process.on('uncaughtException', function (err) {
    logger.error('FATAL Error from uncaughtException event ', err);
    //process.exit(1);
});
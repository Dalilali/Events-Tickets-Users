import logging from "logging";

const logger = logging.default("http-anfrage");

function mwRequestLogger(req, res, next) {

    logger.info(`${req.method} ${req.originalUrl}`);

    next();
};

function mwCatchIllegalJson(err, req, res, next) {

    if (err instanceof SyntaxError) {

        logger.error("Illegal JSON in HTTP-Request: " + err );
        res.status(400).send("Bad Request: JSON-Body kein gültiges JSON.");

    } else {
        next();
    }
}

export default [ mwRequestLogger, mwCatchIllegalJson ];

const {
    colorCodes
} = require('./constants');

const logger = {};

logger.error = (error, header, text) => {
    try {
        if (!text) {
            text = header;
            header = 'ERROR';
        }
        if (text) {
            console.error(colorCodes.FgRed, header, text);
            console.log();
        }
        if (!error.stack) {
            console.error(colorCodes.FgRed, header, error);
        } else {
            console.log(error.stack);
        }
        console.log();
    } catch (loggerError) {
        console.error(colorCodes.FgRed, header, text);
    }
};

logger.log = (header, text) => {
    try {
        if (!text) {
            text = header;
            header = 'LOG';
        }

        console.log(
            colorCodes.FgGreen,
            header,
            JSON.stringify(text, null, 4).replace(/'/g, '')
        );
        console.log();
    } catch (error) {
        console.log(colorCodes.FgGreen, header, text);
    }
};

logger.query = (header, text) => {
    try {
        if (!text) {
            text = header;
            header = 'QUERY';
        }

        console.log(
            colorCodes.FgYellow,
            header,
            JSON.stringify(text, null, 4).replace(/'/g, '')
        );
        console.log();
    } catch (error) {
        console.log(colorCodes.FgYellow, header, text);
    }
};

logger.data = (header, text) => {
    try {
        if (!text) {
            text = header;
            header = 'DATA';
        }

        if (text) {
            const response = JSON.stringify(text, null, 4).replace(/\\/g, '');
            console.log(colorCodes.FgCyan, header, response);
        }
        console.log();
    } catch (error) {
        console.log(colorCodes.FgCyan, header, text);
    }
};

logger.response = (header, text) => {
    try {
        if (!text) {
            text = header;
            header = 'RESPONSE';
        }

        if (text) {
            const response = JSON.stringify(text, null, 4).replace(/\\/g, '');
            console.log(
                colorCodes.FgBlue,
                header,
                response.substring(1, response.length - 1)
            );
        }
        console.log();
    } catch (error) {
        console.log(colorCodes.FgBlue, header, text);
    }
};

logger.request = (header, text) => {
    try {
        if (!text) {
            text = header;
            header = 'REQUEST';
        }

        if (text) {
            const response = JSON.stringify(text).replace(/\\/g, '');
            console.log(colorCodes.FgBlue, header, response);
        }
        console.log();
    } catch (error) {
        console.log(colorCodes.FgBlue, header, text);
    }
};

logger.debug = (header, text) => {
    try {
        if (process.env.NODE_ENV == 'production') {
            return;
        }

        if (!text) {
            text = header;
            header = 'DEBUG';
        }

        console.log(colorCodes.FgMagenta, header, JSON.stringify(text, null, 4));
        console.log();
    } catch (error) {
        console.log(colorCodes.FgMagenta, header, text);
    }
};

module.exports = logger;

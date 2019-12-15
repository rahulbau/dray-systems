const english = require('../localisation/english');
// const arabic = require('../localisation/arabic');

const LANGUAGES = {
    ENGLISH: 'en',
    // ARABIAN: 'ar'
};

function getResponseMessage(code, languageCode) {
    switch (languageCode) {
        case LANGUAGES.ENGLISH:
            return english.responseMessages[code];

        // case LANGUAGES.ARABIAN:
        //     return arabian.responseMessages[code];

        default :
            return english.responseMessages[code];
    }
}
module.exports = {
    getResponseMessage
};

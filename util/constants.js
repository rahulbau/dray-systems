const responseMessageCode = {
    MAX_LOGIN_DEVICES_REACHED: 'MAX_LOGIN_DEVICES_REACHED',
    PARAMETER_MISSING: 'PARAMETER_MISSING',
    INVALID_ACCESS_TOKEN: 'INVALID_ACCESS_TOKEN',
    INVALID_SOCIAL_LOGIN: 'INVALID_SOCIAL_LOGIN',
    CURRENT_PASSWORD_INCORRECT: 'CURRENT_PASSWORD_INCORRECT',
    OLD_PASSWORD_INCORRECT: 'OLD_PASSWORD_INCORRECT',
    INCORRECT_PASSWORD: 'INCORRECT_PASSWORD',
    ACTION_COMPLETE: 'ACTION_COMPLETE',
    LOGIN_SUCCESSFULLY: 'LOGIN_SUCCESSFULLY',
    ERROR_IN_EXECUTION: 'ERROR_IN_EXECUTION',
    UPLOAD_ERROR: 'UPLOAD_ERROR',
    PASSWORD_CHANGED_SUCCESSFULLY: 'PASSWORD_CHANGED_SUCCESSFULLY',
    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    EMAIL_REGISTERED_ALREADY: 'EMAIL_REGISTERED_ALREADY',
    EMAIL_NOT_EXISTS: 'EMAIL_NOT_EXISTS',
    NOT_A_VALID_IMAGE_LIST: 'NOT_A_VALID_IMAGE_LIST',
    SIZE_EXCEEDS: 'SIZE_EXCEEDS',
    VIDEO_SIZE_EXCEEDS: 'VIDEO_SIZE_EXCEEDS',
    ACCOUNT_NOT_REGISTER: 'ACCOUNT_NOT_REGISTER',
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    DOCUMENT_UPLOADED: 'DOCUMENT_UPLOADED',
    NO_DATA_FOUND: 'NO_DATA_FOUND',
    USER_NOT_EXIST:'USER_NOT_EXIST',
    INVALID_CREDENTIALS : 'INVALID_CREDENTIALS',
    OTP_SENT : 'OTP_SENT',
    OTP_MISMATCH : 'OTP_MISMATCH',
    DAILY_STATS_ALREADY_ADDED : 'DAILY_STATS_ALREADY_ADDED'
};

const responseMessageFlags = {
    ACTION_COMPLETE: 200,
    CLIENT_ERROR: 400,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT:409,
    UNAUTHORISED: 401,
    NOT_FOUND:404,
    FORBIDDEN : 403
};

const colorCodes = {
    FgBlack: '\x1b[30m\x1b[1m%s\x1b[0m',
    FgRed: '\x1b[31m\x1b[1m%s\x1b[0m',
    FgGreen: '\x1b[32m\x1b[1m%s\x1b[0m',
    FgYellow: '\x1b[33m\x1b[1m%s\x1b[0m',
    FgBlue: '\x1b[34m\x1b[1m%s\x1b[0m',
    FgMagenta: '\x1b[35m\x1b[1m%s\x1b[0m',
    FgCyan: '\x1b[36m\x1b[1m%s\x1b[0m',
    FgWhite: '\x1b[37m\x1b[1m%s\x1b[0m'
};

const ALLOWED_IMAGE_MIME_TYPE = [
    'image/jpeg',
    'image/jpg',
    'image/pjpeg',
    'image/png',
    'image/*'
];

const ALLOWED_VIDEO_MIME_TYPE = ['video/mp4', 'video/*'];
const MAX_IMAGE_SIZE_ALLOWED = '5242880'; // 5 MB
const MAX_VIDEO_SIZE_ALLOWED = '10485760'; // 10 MB

const IMAGE_DIMESIONS = {
    small_thumb: {
        width: 250,
        height: 250,
        key_name: 'small_thumb'
    },
    medium_thumb: {
        width: 400,
        height: 400,
        key_name: 'medium_thumb'
    }
};

const mediaType = {
    IMAGE: 0,
    AUDIO: 1,
    VIDEO: 2,
    DOCUMENT: 3

}
module.exports = {
    responseMessageCode,
    responseMessageFlags,
    colorCodes,
    ALLOWED_IMAGE_MIME_TYPE,
    ALLOWED_VIDEO_MIME_TYPE,
    MAX_IMAGE_SIZE_ALLOWED,
    MAX_VIDEO_SIZE_ALLOWED,
    IMAGE_DIMESIONS,
    mediaType
};

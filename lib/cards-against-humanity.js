const {
    AUTH_MESSAGE_TYPE,
    makeCreateUserRequest,
    makeLoginRequest,
    makeLoginSuccessResponse,
    makeLoginFailureResponse,
} = require('./modules/networking/auth');

const ALL_MESSAGE_TYPE = {
    ...AUTH_MESSAGE_TYPE,
};

module.exports = {
    ALL_MESSAGE_TYPE,

    AUTH_MESSAGE_TYPE,
    makeCreateUserRequest,
    makeLoginRequest,
    makeLoginSuccessResponse,
    makeLoginFailureResponse,
};

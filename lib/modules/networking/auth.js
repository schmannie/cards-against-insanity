const AUTH_MESSAGE_TYPE = {
    CREATE_USER: 'auth_create_user',

    LOGIN_REQUEST: 'auth_request_login',
    LOGIN_SUCCESS: 'auth_login_success',
    LOGIN_FAILURE: 'auth_login_failure',
};

const AUTH_REQUEST = {
    CREATE_USER: {
        type: AUTH_MESSAGE_TYPE.CREATE_USER,
        body: {
            username: '',
            hash: '',
            salt: '',
        },
    },
    LOGIN: {
        type: AUTH_MESSAGE_TYPE.LOGIN_REQUEST,
        body: {
            username: '',
            hash: '',
            salt: '',
        },
    },
};

const AUTH_RESPONSE = {
    LOGIN_SUCCESS: {
        type: AUTH_MESSAGE_TYPE.LOGIN_SUCCESS,
        body: {
            access_token: '',
            time_to_live: 0,
        },
    },
    LOGIN_FAILURE: {
        type: AUTH_MESSAGE_TYPE.LOGIN_FAILURE,
        body: {
            reason: '',
        },
    },
};

const makeCreateUserRequest = (username, hash, salt) => {

    const request = new Object(AUTH_REQUEST.CREATE_USER);
    request.body.username = username;
    request.body.hash = hash;
    request.body.salt = salt;

    return request;
};

const makeLoginRequest = (username, hash, salt) => {

    const request = new Object(AUTH_REQUEST.LOGIN);
    request.body.username = username;
    request.body.hash = hash;
    request.body.salt = salt;

    return request;
};

const makeLoginSuccessResponse = (access_token, time_to_live) => {

    const response = new Object(AUTH_RESPONSE.LOGIN_SUCCESS);
    response.body.access_token = access_token;
    response.body.time_to_live = time_to_live;

    return response;
};

const makeLoginFailureResponse = (reason) => {

    const response = new Object(AUTH_RESPONSE.LOGIN_FAILURE);
    response.body.reason = reason;

    return response;
};

module.exports = {
    AUTH_MESSAGE_TYPE,
    makeCreateUserRequest,
    makeLoginRequest,
    makeLoginSuccessResponse,
    makeLoginFailureResponse,
};

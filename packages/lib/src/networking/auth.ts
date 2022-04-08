enum AuthMessageType {
    // CREATE_USER: 'auth_create_user',
    // CREATE_USER_SUCCESS: 'auth_create_user_success',
    // CREATE_USER_FAILURE: 'auth_create_user_failure',

    LOGIN_REQUEST = 'auth_request_login',
    LOGIN_SUCCESS = 'auth_login_success',
    LOGIN_FAILURE = 'auth_login_failure',
};

interface IAuthMessage {
    type: AuthMessageType;
};

interface AuthMessageLoginRequest extends IAuthMessage {
    type: AuthMessageType.LOGIN_REQUEST,
    body: {
        username: string,
    },
};

interface AuthMessageLoginResponseSuccess extends IAuthMessage {
    type: AuthMessageType.LOGIN_SUCCESS,
    body: {
        username: string,
        login_time: number,
    },
};

interface AuthMesssageLoginResponseFailure extends IAuthMessage {
    type: AuthMessageType.LOGIN_FAILURE,
    body: {
        reason: string,
    },
};

export {
    AuthMessageType,
    AuthMessageLoginRequest,
    AuthMessageLoginResponseSuccess,
    AuthMesssageLoginResponseFailure,
};

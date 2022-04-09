enum AuthMessageType {
  // CREATE_USER: 'auth_create_user',
  // CREATE_USER_SUCCESS: 'auth_create_user_success',
  // CREATE_USER_FAILURE: 'auth_create_user_failure',

  LOGIN_REQUEST = 'auth_request_login',
  LOGIN_SUCCESS = 'auth_login_success',
  LOGIN_FAILURE = 'auth_login_failure',
};

class LoginRequestMessage {

  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class LoginSuccessMessage {

  id: number;
  name: string;
  login_time: number;

  constructor(id: number, name: string, login_time: number) {
    this.id = id;
    this.name = name;
    this.login_time = login_time;
  }
}

class LoginFailureMessage {

  reason: string;

  constructor(reason: string) {
    this.reason = reason;
  }
}

export {
  AuthMessageType,

  LoginRequestMessage,
  LoginSuccessMessage,
  LoginFailureMessage,
};

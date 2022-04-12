export enum AuthMessageType {
  LOGIN_REQUEST = 'auth_request_login',
  LOGIN_SUCCESS = 'auth_login_success',
  LOGIN_FAILURE = 'auth_login_failure',
};

export class LoginRequestMessage {

  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class LoginSuccessMessage {

  id: string;
  name: string;
  login_time: number;

  constructor(id: string, name: string, login_time: number) {
    this.id = id;
    this.name = name;
    this.login_time = login_time;
  }
}

export class LoginFailureMessage {

  reason: string;

  constructor(reason: string) {
    this.reason = reason;
  }
}

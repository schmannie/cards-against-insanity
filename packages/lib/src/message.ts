import {
  REGISTRATION_REQUEST,
  IRegistrationRequest,
  RegistrationRequest,
} from "./message/request/registration.js";

import {
  REGISTRATION_SUCCESS_RESPONSE,
  IRegSuccessResponse,
  RegSuccessResponse,
} from "./message/response/regSuccess.js";

import {
  REGISTRATION_FAILURE_RESPONSE,
  IRegFailureResponse,
  RegFailureResponse,
} from "./message/response/regFailure.js";

export {
  RegistrationRequest,
  IRegistrationRequest,
  REGISTRATION_REQUEST,
  
  RegSuccessResponse,
  IRegSuccessResponse,
  REGISTRATION_SUCCESS_RESPONSE,
  
  RegFailureResponse,
  IRegFailureResponse,
  REGISTRATION_FAILURE_RESPONSE,
};

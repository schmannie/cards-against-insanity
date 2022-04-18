import { Message } from '../models/Message.js';

export const REGISTRATION_FAILURE_RESPONSE = 'REGISTRATION_FAILURE_RESPONSE';

export type IRegFailureResponse = {
  error: string;
};

export class RegFailureResponse extends Message<IRegFailureResponse> {
  constructor(data: IRegFailureResponse) {
    super(data);
  }
};

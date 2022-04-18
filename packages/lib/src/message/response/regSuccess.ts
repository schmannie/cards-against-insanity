import { AuthenticatedPlayer } from '../../player.js';
import { Message } from '../models/Message.js';

export const REGISTRATION_SUCCESS_RESPONSE = 'REGISTRATION_SUCCESS_RESPONSE';

export type IRegSuccessResponse = {
  player: AuthenticatedPlayer;
};

export class RegSuccessResponse extends Message<IRegSuccessResponse> {
  constructor(data: IRegSuccessResponse) {
    super(data);
  }
};

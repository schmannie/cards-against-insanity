import { Player } from '../../player.js';
import { Message } from '../models/Message.js';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';

export type IRegistrationRequest = {
  player: Player;
};

export class RegistrationRequest extends Message<IRegistrationRequest> {
  constructor(data: IRegistrationRequest) {
    super(data);
  }
};

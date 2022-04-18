import { Player } from './Player.js';

export type AuthenticatedPlayer = Player & {
  token: string;
};

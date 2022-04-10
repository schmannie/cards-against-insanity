export interface IPlayer {
  name: string,
  login_time: number,
};

export type Players = Record<string, IPlayer>;

type IMessage<T> = {
  token: string | null;
  payload: T;
};

export class Message<T> {
  body: IMessage<T>;

  constructor(data: T, token: string | null = null) {
    this.body = {
      token: token,
      payload: data,
    };
  }

  toString(): string {
    return JSON.stringify(this.body);
  }
};

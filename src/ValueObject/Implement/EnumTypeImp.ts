import { EnumType } from '../EnumType';

enum StatusString {
  UP = 'UP',
  DOWN = 'DOWN',
}

export class EnumTypeImp extends EnumType<string> {
  protected _enum = StatusString;
  get enum() {
    return this._enum;
  }

  protected enumValues(): string[] {
    return Object.keys(StatusString);
  }
}

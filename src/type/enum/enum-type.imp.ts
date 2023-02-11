import { EnumType } from './';

enum StatusString {
  UP = 'up',
  DOWN = 'down',
}

export class EnumTypeImp extends EnumType<string> {
  protected _enum = StatusString;
  get enum() {
    return this._enum;
  }

  public validValue(value: string): boolean {
    return Object.keys(StatusString)
      .map((e) => StatusString[e])
      .includes(value);
  }
}

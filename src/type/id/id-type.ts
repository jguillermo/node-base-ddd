import { UuidType } from '../uuid/';

type ValueType = string | null;

export abstract class IdType extends UuidType {
  // protected _value: string;
  // get value(): string {
  //   return this._value;
  // }

  protected filter(value: any): string | null {
    if (value === null) {
      throw new Error(`is required.`);
    }
    return super.filter(value);
  }
}

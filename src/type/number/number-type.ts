import { BaseType } from '../base';

export abstract class NumberType extends BaseType<number> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return `${this.value}`;
  }

  protected filter(value: any): number | null {
    if (value === null) {
      return null;
    }
    const number = Number(value);
    return isNaN(number) ? 0 : number.valueOf();
  }
}

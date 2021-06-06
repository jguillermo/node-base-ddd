import { BaseType } from './BaseType';

export abstract class NumberType extends BaseType<number> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return `${this.value}`;
  }
}

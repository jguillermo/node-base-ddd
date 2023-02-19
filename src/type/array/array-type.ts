import { BaseType } from '../base';
import { isArray } from 'class-validator';

export abstract class ArrayType<T> extends BaseType<Array<T>> {
  get toString(): string {
    return this.value ? this.value.toString() : '';
  }

  protected filter(value: any): Array<T> | null {
    if (!value) {
      return null;
    }
    if (!isArray(value)) {
      throw new Error(`value ${value} is not a Array.`);
    }
    value.forEach((item: any) => {
      if (!this.itemValidator(item)) {
        throw new Error(`${item} is not valid value in array.`);
      }
    });
    return value;
  }

  protected abstract itemValidator(item: any): boolean;
}

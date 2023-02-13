import { BaseType } from '../base';
import { PrimitiveTypes } from '../../primitives/primitives';

export abstract class EnumType<T> extends BaseType<T> {
  constructor(value: T | null) {
    super(value);
  }

  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return `${this.value}`;
  }

  protected filter(value: T | null): T | null {
    return value;
  }

  static create<PT>(value: PrimitiveTypes | PT, entries: PrimitiveTypes[]): PT | null {
    if (value === null) {
      return null;
    }
    if (entries.filter((v) => v === value).length === 0) {
      throw new Error(`value ${value} is not in Enum.`);
    }
    return value as PT;
  }
}

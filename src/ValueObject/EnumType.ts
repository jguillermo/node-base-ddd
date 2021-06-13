import { BaseType } from './BaseType';

export abstract class EnumType<T> extends BaseType<T> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return `${this.value}`;
  }

  protected abstract enumValues(): T[];

  protected abstract get enum();

  protected filter(value: any): T | null {
    if (value === null) {
      return null;
    }
    if (!this.enumValues().includes(value)) {
      throw new Error(`Value ${value} is not in Enum`);
    }
    return value;
  }
}

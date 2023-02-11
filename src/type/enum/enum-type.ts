import { BaseType } from '../base';

export abstract class EnumType<T> extends BaseType<T> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return `${this.value}`;
  }

  public abstract validValue(value: T): boolean;

  protected abstract get enum();

  protected filter(value: any): T | null {
    if (value === null) {
      return null;
    }
    if (!this.validValue(value)) {
      throw new Error(`value ${value} is not in Enum.`);
    }
    return value;
  }
}

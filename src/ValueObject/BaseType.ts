export abstract class BaseType<T> {
  protected _value: T | null;

  constructor(value: T | null = null) {
    this._value = this.filter(value);
  }

  get value(): T | null {
    return this._value;
  }

  get isNull(): boolean {
    return this._value === null;
  }

  get isNotNull(): boolean {
    return !this.isNull;
  }

  isValid(): boolean {
    return true;
  }

  static validatorMessage(): string {
    return '';
  }

  abstract get toString(): string;

  protected abstract filter(value: any): T | null;
}

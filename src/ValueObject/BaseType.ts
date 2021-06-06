export abstract class BaseType<T> {
  constructor(protected _value: T | null = null) {}

  get value(): T | null {
    return this._value;
  }

  get isNull(): boolean {
    return this._value === null;
  }

  abstract get toString(): string;
}

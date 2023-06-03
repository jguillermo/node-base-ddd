import { AbstractType, ValueTypeNullable } from '../abstract-type';

type BooleanTypes = boolean | null;

export abstract class BooleanType<TT extends BooleanTypes = ValueTypeNullable<boolean>> extends AbstractType<TT> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return this.value ? 'true' : 'false';
  }

  protected filter(value: any): TT {
    if (value === null) {
      return <TT>(<any>null);
    }
    if (typeof value === 'string') {
      if (value === 'false') {
        return <TT>false;
      }
      if (value === 'true') {
        return <TT>true;
      }
    }
    return <TT>!!value;
  }
}

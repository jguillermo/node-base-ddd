import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { BaseType } from './BaseType';

dayjs.extend(utc);
export abstract class DateType extends BaseType<string> {
  protected filter(value: any): string | null {
    if (value === null) {
      return null;
    }
    if (typeof value === 'boolean' || typeof value === 'number') {
      throw new Error(`Date is not valid`);
    }
    const _dateAux = dayjs.utc(value);
    if (!_dateAux.isValid()) {
      throw new Error(`Date is not valid`);
    }
    return _dateAux.toISOString();
  }

  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return <string>this.value;
  }
}

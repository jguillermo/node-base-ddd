import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { BaseType } from '../base';

dayjs.extend(utc);

export abstract class DateType extends BaseType<Date> {
  constructor(value: any = null) {
    super(value);
  }

  protected filter(value: any): Date | null {
    if (value === null) {
      return null;
    }
    if (typeof value === 'boolean' || typeof value === 'number') {
      throw new Error(`date is not valid.`);
    }
    const _dateAux = dayjs.utc(value);
    if (!_dateAux.isValid()) {
      throw new Error(`date is not valid.`);
    }
    return new Date(_dateAux.toISOString());
  }

  get toString(): string {
    if (this.isNull) {
      return '';
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.value.toISOString();
  }
}

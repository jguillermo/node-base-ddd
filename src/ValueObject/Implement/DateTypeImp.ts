import { DateType } from '../DateType';

export class DateTypeImp extends DateType {
  static create(value: any = null) {
    return new DateTypeImp(value);
  }
}

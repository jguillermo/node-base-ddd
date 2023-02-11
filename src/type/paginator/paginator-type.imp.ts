import { NumberTypeImp } from '../number';
import { ValidatorInterface } from '../../validator';

export class PaginatorTypeImp implements ValidatorInterface {
  constructor(private _page: NumberTypeImp, private _perPage: NumberTypeImp) {}

  static create(page: number | null = null, perPage: number | null = null) {
    if (page) {
      const pageRound = new NumberTypeImp(page);
      page = Math.round(<number>pageRound.value);
    }
    if (perPage) {
      const perPageRound = new NumberTypeImp(perPage);
      perPage = Math.round(<number>perPageRound.value);
    }

    return new PaginatorTypeImp(new NumberTypeImp(page), new NumberTypeImp(perPage));
  }

  static empty() {
    return PaginatorTypeImp.create(null, null);
  }

  get page(): NumberTypeImp {
    return this._page;
  }

  get perPage(): NumberTypeImp {
    return this._perPage;
  }

  isEmpty() {
    return this._page.isNull && this._perPage.isNull;
  }

  isValid(): boolean {
    if (this.isEmpty()) {
      return false;
    } else {
      if (null !== this.page.value && this.page.value <= 0) {
        return false;
      }
      if (null !== this.perPage.value && this.perPage.value <= 0) {
        return false;
      }
    }

    return true;
  }

  validatorMessage(): string {
    let message;
    if (this.isEmpty()) {
      message = 'is required.';
    } else {
      if (null !== this.page.value && this.page.value <= 0) {
        message = 'page must be positive.';
      }
      if (null !== this.perPage.value && this.perPage.value <= 0) {
        message = 'perPage must be positive.';
      }
    }

    return message;
  }
}

import { FilterItem, FilterOpStr } from './';

describe('FilterItem', () => {
  it('array', () => {
    const filters: FilterItem[] = [
      {
        field: 'id',
        opStr: FilterOpStr.EQUAL_TO,
        value: '1',
      },
    ];
    expect(filters[0]).toEqual({
      field: 'id',
      opStr: '==',
      value: '1',
    });
  });
});

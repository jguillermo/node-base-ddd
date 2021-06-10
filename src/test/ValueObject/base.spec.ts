export class ValueGenerator {
  static valueString(value: string): any {
    return value;
  }

  static valueBoolean(value: boolean): any {
    return value;
  }

  static valueNumber(value: number): any {
    return value;
  }
}

describe('String Type', () => {
  it('should be', () => {
    expect(ValueGenerator.valueString('string')).toEqual('string');
    expect(ValueGenerator.valueBoolean(true)).toEqual(true);
    expect(ValueGenerator.valueBoolean(false)).toEqual(false);
    expect(ValueGenerator.valueNumber(0)).toEqual(0);
    expect(ValueGenerator.valueNumber(1)).toEqual(1);
  });
});

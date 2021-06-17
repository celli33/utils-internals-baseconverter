import { BaseConverter } from '../../src/BaseConverter';
import { BaseConverterSequence } from '../../src/BaseConverterSequence';

describe('BaseConverter', () => {
  it('BasicFunctionality', () => {
    const hexSequence = new BaseConverterSequence('0123456789ABCDEF');
    const converter = new BaseConverter(hexSequence);
    expect(converter.sequence()).toBe(hexSequence);
    expect(converter.maximumBase()).toBe(16);
    const input = 'FFFF';
    const expected = parseInt(input, 16).toString(2);
    expect(converter.convert(input, 16, 2)).toBe(expected);
  });
  it('ConvertEmptyString', () => {
    const converter = BaseConverter.createBase36();
    expect(converter.convert('', 10, 2)).toBe('0');
  });
  it.each([[-1], [0], [1], [37]])('InvalidFromBase(%i)', (base: number) => {
    const converter = BaseConverter.createBase36();
    expect.assertions(1);
    try {
      converter.convert('', base, 16);
    } catch (e) {
      expect(e.message).toBe('Invalid from base');
    }
  });
  it.each([[-1], [0], [1], [37]])('InvalidToBase(%i)', (base: number) => {
    const converter = BaseConverter.createBase36();
    expect.assertions(1);
    try {
      converter.convert('', 16, base);
    } catch (e) {
      expect(e.message).toBe('Invalid to base');
    }
  });
  it('ConvertWithInputNotIsSequence', () => {
    const converter = BaseConverter.createBase36();
    expect.assertions(1);
    try {
      converter.convert('@', 16, 10);
    } catch (e) {
      expect(e.message).toBe('The number to convert contains invalid characters');
    }
  });
  it('ConvertUsingLongInput', () => {
    // this is the main reason to exists of BaseConverter class
    // since parseInt and toString cannot handle large inputs
    const input = '3330303031303030303030333030303233373038';
    const expected = '292233162870206001759766198425879490508935868472';
    const converter = BaseConverter.createBase36();
    expect(converter.convert(input, 16, 10)).toBe(expected);
  });
  it('ConvertZeroUsingSameBase', () => {
    const input = '0000000';
    const expected = '0';
    const converter = BaseConverter.createBase36();
    expect(converter.convert(input, 2, 2)).toBe(expected);
  });
  it('ConvertZeroUsingDifferentBase', () => {
    const input = '0000000';
    const expected = '0';
    const converter = BaseConverter.createBase36();
    expect(converter.convert(input, 2, 4)).toBe(expected);
  });
  it('ConvertZeroUsingLettersSequence', () => {
    // base_convert(501020304050607, 8, 16) => 141083105187
    //        501020304050607
    const input = 'FABACADAEAFAGAH';
    //           141083105187
    const expected = 'BEBAIDBAFBIH';

    const converter = new BaseConverter(new BaseConverterSequence('ABCDEFGHIJKLMNOPQRSTUVWXYZ'));
    expect(converter.convert(input, 8, 16)).toBe(expected);
  });
});

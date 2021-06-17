import { BaseConverterSequence } from '../../src/BaseConverterSequence';

describe('BaseConverterSequence', () => {
  it('ValidSequence', () => {
    const source = 'ABCD';
    let sequence = new BaseConverterSequence(source);
    expect(sequence.value()).toEqual(source);
    expect(sequence.length()).toEqual(4);
    expect(sequence.toString()).toEqual(source);
  });
  it('InvalidSequenceWithEmptyString', () => {
    expect.assertions(1);
    try {
      new BaseConverterSequence('');
    } catch (e) {
      expect(e.message).toBe('Sequence does not contains enough elements');
    }
  });
  it('InvalidSequenceWithOneChar', () => {
    expect.assertions(1);
    try {
      new BaseConverterSequence('X');
    } catch (e) {
      expect(e.message).toBe('Sequence does not contains enough elements');
    }
  });
  it('InvalidSequenceWithMultibyte', () => {
    expect.assertions(1);
    try {
      new BaseConverterSequence('f𝌆');
    } catch (e) {
      expect(e.message).toBe('Cannot use multibyte strings in dictionary');
    }
  });
  it('InvalidSequenceWithRepeatedChars', () => {
    expect.assertions(1);
    try {
      new BaseConverterSequence('ABCBA');
    } catch (e) {
      expect(e.message).toBe('The sequence has not unique values: A,B');
    }
  });
  it('InvalidSequenceWithRepeatedCharsDifferentCase', () => {
    expect.assertions(1);
    try {
      new BaseConverterSequence('ABCDabcd');
    } catch (e) {
      expect(e.message).toBe('The sequence has not unique values: A,B,C,D');
    }
  });
  it('IsValidMethod', () => {
    expect(BaseConverterSequence.isValid('abc')).toBeTruthy();
    expect(BaseConverterSequence.isValid('abcb')).toBeFalsy();
    expect(BaseConverterSequence.isValid('')).toBeFalsy();
    expect(BaseConverterSequence.isValid('0')).toBeFalsy();
  });
});

import { BaseConverterSequence } from './BaseConverterSequence';

export class BaseConverter {
  private sequenceBase: BaseConverterSequence;

  constructor(sequenceBase: BaseConverterSequence) {
    this.sequenceBase = sequenceBase;
  }

  public sequence(): BaseConverterSequence {
    return this.sequenceBase;
  }

  public maximumBase(): number {
    return this.sequenceBase.length();
  }

  public static createBase36(): BaseConverter {
    return new BaseConverter(new BaseConverterSequence('0123456789abcdefghijklmnopqrstuvwxyz'));
  }

  public convert(input: string, frombase: number, tobase: number): string {
    if (frombase < 2 || frombase > this.maximumBase()) {
      throw new Error('Invalid from base');
    }
    if (tobase < 2 || tobase > this.maximumBase()) {
      throw new Error('Invalid to base');
    }
    let originalSequence = this.sequence().value();
    if (!input) {
      input = originalSequence[0]; // use zero as input
    }
    let chars = originalSequence.substring(0, frombase);
    if (!new RegExp(`^[${chars}]+$`).test(input)) {
      throw new Error('The number to convert contains invalid characters');
    }
    let length = input.length;
    const values = [];
    for (let index = 0; index < length; index++) {
      values.push(originalSequence.indexOf(input.charAt(index)));
    }
    let result = '';
    let newlen = 0;
    do {
      let divide = 0;
      newlen = 0;
      for (let index = 0; index < length; index++) {
        divide = divide * frombase + values[index];
        if (divide >= tobase) {
          values[newlen] = Math.floor(divide / tobase);
          divide = divide % tobase;
          newlen += 1;
        } else if (newlen > 0) {
          values[newlen] = 0;
          newlen += 1;
        }
      }
      length = newlen;
      result = `${originalSequence[divide]}${result}`;
    } while (newlen > 0);
    return result;
  }
}

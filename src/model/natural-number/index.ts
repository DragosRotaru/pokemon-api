import { WholeNumber } from "../whole-number";

export class NaturalNumber extends WholeNumber {
  constructor(value: number) {
    super(value);
    if (!NaturalNumber.is(value))
      throw new Error(`value is not a ${NaturalNumber.name}`);
    this._value = value;
  }
  get val() {
    return this._value;
  }
  set val(value: number) {
    if (!NaturalNumber.is(value))
      throw new Error(`value is not a ${NaturalNumber.name}`);
    this._value = value;
  }
  static is(input: number): boolean {
    return WholeNumber.is(input) && input.valueOf() >= 1;
  }
  multiply(percentage: number) {
    this.val = Math.round(percentage * this.val);
  }
}

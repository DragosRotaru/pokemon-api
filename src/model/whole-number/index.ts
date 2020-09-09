export class WholeNumber {
  protected _value: number;
  constructor(value: number) {
    if (!WholeNumber.is(value))
      throw new Error(`value is not a ${WholeNumber.name}`);
    this._value = value;
  }
  get val() {
    return this._value;
  }
  set val(value: number) {
    if (!WholeNumber.is(value))
      throw new Error(`value is not a ${WholeNumber.name}`);
    this._value = value;
  }
  static is(input: unknown): boolean {
    return (
      typeof input === "number" &&
      input.valueOf() >= 0 &&
      Number.isInteger(input)
    );
  }
}

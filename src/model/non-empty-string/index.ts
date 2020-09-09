export class NonEmptyString {
  private _value: string;
  constructor(value: string) {
    if (!NonEmptyString.is(value))
      throw new Error(`value is not a ${NonEmptyString.name}`);
    this._value = value;
  }
  get val() {
    return this._value;
  }
  set val(value: string) {
    if (!NonEmptyString.is(value))
      throw new Error(`value is not a ${NonEmptyString.name}`);
    this._value = value;
  }
  static is(input: unknown): boolean {
    return typeof input === "string" && input.length > 0;
  }
}

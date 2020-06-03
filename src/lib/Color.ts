class Color {
  private _red: number = 0;
  private _green: number = 0;
  private _blue: number = 0;

  constructor(red: number, green: number, blue: number) {
    this._red = red;
    this._green = green;
    this._blue = blue;
  }

  red(): number {
    return this._red;
  }

  green(): number {
    return this._green;
  }

  blue(): number {
    return this._blue;
  }

  toString(): string {
    return (
      "#" +
      this._red.toString(16).padStart(2, "0") +
      this._green.toString(16).padStart(2, "0") +
      this._blue.toString(16).padStart(2, "0")
    );
  }
}

export default Color;

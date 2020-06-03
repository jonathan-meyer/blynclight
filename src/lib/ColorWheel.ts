import Color from "color";

class ColorWheel {
  private position: number = 0;

  private getColor(position: number): Color {
    let color: Color;
    let pos = 255 - position;

    if (pos < 85) {
      color = Color.rgb(255 - pos * 3, 0, pos * 3);
    } else if (pos < 170) {
      pos -= 85;
      color = Color.rgb(0, pos * 3, 255 - pos * 3);
    } else {
      pos -= 170;
      color = Color.rgb(pos * 3, 255 - pos * 3, 0);
    }

    return color;
  }

  current(): Color {
    return this.getColor(this.position);
  }

  previous(): Color {
    this.position--;
    if (this.position < 0) this.position = 255;

    return this.getColor(this.position);
  }

  next(): Color {
    this.position++;
    if (this.position > 255) this.position = 0;

    return this.getColor(this.position);
  }
}

export default ColorWheel;

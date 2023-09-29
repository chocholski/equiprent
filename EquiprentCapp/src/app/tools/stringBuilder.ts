export class StringBuilder {
  private value: string[];

  constructor(initialValue?: string) {
    this.value = [];

    if (initialValue)
      this.append(initialValue);
  }

  append(text: string): StringBuilder {
    this.value.push(text);

    return this;
  }

  appendLine(text?: string): StringBuilder {
    return this.append(text ? text : '').append('\n');
  }

  removeFromEnd(numberOfChars: number): StringBuilder {
    if (this.value.length == 0) {
      return this;
    }

    if (numberOfChars >= this.value[this.value.length - 1].length) {
      this.value = [];
    }
    else {
      this.value[this.value.length - 1] = this.value[this.value.length - 1]?.slice(0, -numberOfChars);
    }

    return this;
  }

  charAtEquals(index: number, char: string): boolean {
    if (index < 0 || index >= this.value.length) {
      return false;
    }

    return this.value[index] === char;
  }

  length(): number {
    return this.value.length > 0 ? this.value[this.value.length - 1].length : 0;
  }

  toString(): string {
    return this.value.join('');
  }
}
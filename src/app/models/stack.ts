export class Stack<T> {
  private _data: T[] = [];

  get data(): T[] {
    return this._data;
  }

  push(value: T): void {
    this.data.push(value);
  }

  pop(): T {
    return this.data.splice(this.size() - 1, 1)[0];
  }

  peek(): T {
    return this.data[this.size() - 1];
  }

  size(): number {
    return this.data.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }
}

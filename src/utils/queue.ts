export class Queue<T> {
  private data: T[];

  constructor(initialData: T[] = []) {
    this.data = [...initialData];
  }

  push(item: T): void {
    this.data.push(item);
  }

  popleft(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.data.shift() as T;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }
}

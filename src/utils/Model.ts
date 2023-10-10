export default abstract class Model<T> {
  protected entity: T | undefined;
  constructor(entity: T) {
    this.entity = entity;
  }

  save() {}
}

export class Note {
  constructor(note) {
    this._id = note.id;
    this._title = note.title;
    this._content = note.content;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get content() {
    return this._content;
  }
}

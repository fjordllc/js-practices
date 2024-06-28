import Enquirer from "enquirer";

export class NoteList {
  constructor(notes) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  seeAllTitles() {
    this.notes.forEach((note) => console.log(note.title));
  }

  async selectNote(messageText) {
    const question = {
      type: "select",
      name: "toSeeNote",
      message: messageText,
      choices: this.notes.map((note) => ({
        name: note.title,
        value: note,
      })),
      result() {
        return this.focused.value;
      },
    };
    const answer = await Enquirer.prompt(question);
    return answer.toSeeNote;
  }
}

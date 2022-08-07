import { faker } from "@faker-js/faker";
import { Note } from "./schema/note";

export async function fetchNotes(num = 10): Promise<Array<Note>> {
  const notes = []
  for (let index = 0; index < num; index++) {
    const id = String(index + 1)
    const title = faker.lorem.text()
    const content = faker.lorem.paragraphs(2)
    notes.push({ id, title, content })
  }
  return notes
}
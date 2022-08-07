import type { Note } from '../../schema/note'
import { fetchNotes } from '../../note-date'

async function getAllNotes(): Promise<Array<Note>> {
  return fetchNotes()
}

export const database = {
  getAllNotes,
}

import type { Note } from '../../schema/note'
import { fetchNotes } from '../../note-date'
import { Firestore } from '@google-cloud/firestore'

async function getAllNotes(): Promise<Array<Note>> {
  return fetchNotes()
}

export const database = {
  getAllNotes,
  addNote,
}


// Create a new client
const firestore = new Firestore({
  projectId: 'emulator-01',
});

async function addNote({ id, title, content }: { id: string, title: string, content: string }): Promise<Array<Note>> {
  // Obtain a document reference.
  const collection = firestore.collection('notes');
  
  await collection.add({
    id,
    title,
    content,
  })
  
  const snapshots = await collection.get()
  return snapshots.docs.map(doc => doc.data()) as Note[]
}

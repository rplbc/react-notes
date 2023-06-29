import { auth, firestore } from '@/lib/firebase'
import { signOut } from '@/store/slices/user'
import type { Note } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

type NotesState = {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  items: Note[]
}

export const getNotes = createAsyncThunk('notes/get', async () => {
  if (!auth.currentUser) throw new Error('Unauthorized')

  const notesQuerySnap = await getDocs(
    query(
      collection(firestore, 'user', auth.currentUser.uid, 'note'),
      orderBy('timestamp', 'desc')
    )
  )

  return notesQuerySnap.docs.map((doc) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { timestamp, ...rest } = doc.data()

    return {
      id: doc.id,
      ...rest,
    }
  }) as Note[]
})

export const getNote = createAsyncThunk('notes/getOne', async (id: string) => {
  if (!auth.currentUser) throw new Error('Unauthorized')

  const notesQuerySnap = await getDoc(
    doc(firestore, 'user', auth.currentUser.uid, 'note', id)
  )

  if (!notesQuerySnap.exists()) throw new Error('Note not found')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { timestamp, ...note } = notesQuerySnap.data()

  console.log(note)

  return { id, ...note } as Note
})

export const addNote = createAsyncThunk(
  'notes/add',
  async (data: Omit<Note, 'id'>) => {
    if (!auth.currentUser) throw new Error('Unauthorized')

    const res = await addDoc(
      collection(firestore, 'user', auth.currentUser.uid, 'note'),
      { ...data, timestamp: serverTimestamp() }
    )

    return { id: res.id, ...data }
  }
)

export const updateNote = createAsyncThunk(
  'notes/update',
  async (note: Note) => {
    if (!auth.currentUser) throw new Error('Unauthorized')

    const { id, ...data } = note

    const res = await updateDoc(
      doc(firestore, 'user', auth.currentUser.uid, 'note', id),
      data
    )

    return res
  }
)

export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (id: Note['id']) => {
    if (!auth.currentUser) throw new Error('Unauthorized')

    await deleteDoc(doc(firestore, 'user', auth.currentUser.uid, 'note', id))
    return id
  }
)

const initialState: NotesState = {
  status: 'idle',
  items: [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.fulfilled, (_, action) => ({
        status: 'fulfilled',
        items: action.payload,
      }))
      .addCase(getNote.fulfilled, (state, { payload }) => {
        const alreadyExists = state.items.some(({ id }) => payload.id === id)

        if (alreadyExists) return state

        state.items = [payload, ...state.items]
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items]
      })
      .addCase(updateNote.fulfilled, (state) => state)
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
      .addCase(signOut.pending, () => initialState)
  },
})

export default notesSlice.reducer

import { auth, firestore } from '@/firebase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'

export type Note = {
  id: string
  title: string
  content: string
}

export type Notes = Note[]

export const addNote = createAsyncThunk(
  'notes/create',
  async (data: Omit<Note, 'id'>) => {
    if (!auth.currentUser) throw new Error('Unauthorized')
    const res = await addDoc(
      collection(firestore, 'user', auth.currentUser.uid, 'note'),
      data
    )

    return { id: res.id, ...data }
  }
)

export const removeNote = createAsyncThunk(
  'notes/add',
  async (id: Note['id']) => {
    if (!auth.currentUser) throw new Error('Unauthorized')
    await deleteDoc(doc(firestore, 'user', auth.currentUser.uid, 'note', id))
    return id
  }
)

export const getNotes = createAsyncThunk('notes/get', async () => {
  if (!auth.currentUser) throw new Error('Unauthorized')

  const notesQuerySnap = await getDocs(
    collection(firestore, 'user', auth.currentUser.uid, 'note')
  )

  return notesQuerySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Note[]
})

const initialState: Notes = []

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.fulfilled, (_, action) => action.payload)
      .addCase(addNote.fulfilled, (state, action) => [action.payload, ...state])
      .addCase(removeNote.fulfilled, (state, action) =>
        state.filter((item) => item.id !== action.payload)
      )
  },
})

export default notesSlice.reducer

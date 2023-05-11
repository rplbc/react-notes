import { useAppDispatch } from '@/store/hooks'
import { Note, updateNote } from '@/store/slices/notes'
import { Button } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const NoteEditor = ({
  id,
  content,
  title,
}: Pick<Note, 'id' | 'content' | 'title'>) => {
  const dispatch = useAppDispatch()
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'Note...' })],
    content,
  })

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Code />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>
        <Button
          onClick={async () => {
            try {
              const content = editor?.getHTML() || ''
              await dispatch(updateNote({ id, content, title })).unwrap()
            } catch (err) {
              console.log(err)
            }
          }}
        >
          Save
        </Button>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  )
}

export default NoteEditor

import ResponseMessage from '@/components/ResponseMessage'
import { useAppDispatch, useLoadingContext } from '@/hooks'
import { Note, updateNote } from '@/store/slices/notes'
import { ResponseMsg } from '@/types'
import { Button } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'

const NoteEditor = ({
  id,
  content,
  title,
}: Pick<Note, 'id' | 'content' | 'title'>) => {
  const { isLoading, setIsLoading } = useLoadingContext()
  const [res, setRes] = useState<ResponseMsg | null>(null)
  const dispatch = useAppDispatch()
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'Note...' })],
    content,
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRes(null)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [res])

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
            setRes(null)
            setIsLoading(true)

            try {
              const content = editor?.getHTML() || ''
              await dispatch(updateNote({ id, content, title })).unwrap()

              setRes({
                status: 'success',
                msg: 'Saved',
              })
            } catch (err) {
              console.log(err)

              setRes({
                status: 'error',
                msg: 'Something went wrong, please try again',
              })
            }

            setIsLoading(false)
          }}
          disabled={isLoading}
        >
          Save
        </Button>
        {res && <ResponseMessage {...res} />}
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  )
}

export default NoteEditor

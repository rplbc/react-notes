import { useEffect, useLayoutEffect } from 'react'

type PageProps = React.PropsWithChildren<{ title: string }>

const Page = ({ title, children }: PageProps) => {
  const hook = typeof document !== 'undefined' ? useLayoutEffect : useEffect

  hook(() => {
    document.title = `Notes - ${title}`
  }, [title])

  return <>{children}</>
}

export default Page

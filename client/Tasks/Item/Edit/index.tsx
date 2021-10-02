import { FC, FormEvent, useState } from 'react'

import classes from './index.module.css'

export const TasksItemEdit: FC<{
  initial: string
  onSave: (text: string) => void
}> = ({ initial, onSave }) => {
  const [text, setText] = useState(initial)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    onSave(text)
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <input
        autoFocus
        type="text"
        value={text}
        className={classes.input}
        onChange={e => {
          setText(e.target.value)
        }}
      />
    </form>
  )
}

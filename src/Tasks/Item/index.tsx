import { FC, useState } from 'react'

import { TasksItemEdit } from './Edit'
import classes from './index.module.css'

export const TasksItem: FC<{
  text: string
  finished: boolean
}> = ({ text, finished }) => {
  const [editing, setEditing] = useState(false)
  function toggleEditing() {
    setEditing(!editing)
  }

  function onSave(text: string) {
    setEditing(false)
  }

  return (
    <li className={classes.item}>
      <input type="checkbox" checked={finished} />
      {editing ? (
        <TasksItemEdit initial={text} onSave={onSave} />
      ) : (
        <span className={classes.text}>{text}</span>
      )}
      <button onClick={toggleEditing}>🖊️</button>&nbsp;
      <button>🗑️</button>
    </li>
  )
}

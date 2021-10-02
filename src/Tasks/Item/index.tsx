import { FC, useState, ChangeEvent } from 'react'

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

  function onCheck(e: ChangeEvent) {}

  function onRename(text: string) {
    setEditing(false)
  }

  return (
    <li className={classes.item}>
      <input type="checkbox" checked={finished} onChange={onCheck} />
      {editing ? (
        <TasksItemEdit initial={text} onSave={onRename} />
      ) : (
        <span className={classes.text}>{text}</span>
      )}
      <button onClick={toggleEditing}>🖊️</button>&nbsp;
      <button>🗑️</button>
    </li>
  )
}

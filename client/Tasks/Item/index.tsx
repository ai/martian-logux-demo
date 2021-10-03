import { FC, useState, ChangeEvent } from 'react'

import { TasksItemEdit } from './Edit'
import classes from './index.module.css'

// Step 17: Import Logux tools
// import { useClient } from '@logux/client/react'
// import { changeSyncMapById, deleteSyncMapById } from '@logux/client'
// import { Task } from '../../stores/task'

export const TasksItem: FC<{
  id: string
  text: string
  finished: boolean
}> = ({ id, text, finished }) => {
  const [editing, setEditing] = useState(false)
  function toggleEditing() {
    setEditing(!editing)
  }

  // Step 18: Get client
  // let client = useClient()

  function onDelete() {
    // Step 19: Delete task
    // deleteSyncMapById(client, Task, id)
  }

  function onCheck(e: ChangeEvent<HTMLInputElement>) {
    // Step 20: Change task finished
    // changeSyncMapById(client, Task, id, { finished: e.target.checked })
  }

  function onRename(text: string) {
    setEditing(false)

    // Step 21: Change task finished
    // changeSyncMapById(client, Task, id, { text })
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
      <button onClick={onDelete}>🗑️</button>
    </li>
  )
}

import type { FC, FormEvent } from 'react'

// Step 13: Import store action
import { useClient } from '@logux/client/react'
import { createSyncMap } from '@logux/client'
import { Task } from '../../stores/task'
import { nanoid } from 'nanoid'

import classes from './index.module.css'

export const TasksNew: FC<{ userId: string }> = ({ userId }) => {
  // Step 14: Get client
  let client = useClient()

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const input = e.currentTarget.querySelector<HTMLInputElement>('input')
    if (input) {
      const text = input.value

      // Step 15: Create task
      createSyncMap(client, Task, {
        id: nanoid(),
        userId,
        text,
        finished: false
      })
      
      input.value = ''
    }
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <input className={classes.input} type="text" placeholder="New task" />
    </form>
  )
}

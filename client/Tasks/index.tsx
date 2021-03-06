import type { FC } from 'react'

import { TasksItem } from './Item'
import { TasksNew } from './New'
import classes from './index.module.css'

// Step 10: Load hooks for Logux SyncMap
import { useFilter } from '@logux/client/react'
import { Task } from '../stores/task'

// Step 24: Use finish all action
import { useClient } from '@logux/client/react'
import { finishAll } from '../stores/task'

export const Tasks: FC<{ userId: string }> = ({ userId }) => {
  let client = useClient()
  function finishAllClick() {
    finishAll(client)
  }

  // Step 11: Load tasks from server
  let tasks = useFilter(Task, { userId })

  return (
    <div className={classes.body}>
      <ul className={classes.list}>
        {/*
        <TasksItem id="1" text="First" finished={false} />
        <TasksItem id="2" text="First" finished={true} />
        */}
        {tasks.isLoading
          ? 'Loading…'
          : tasks.isEmpty
          ? 'No tasks'
          : tasks.list.map(task => (
              <TasksItem
                key={task.id}
                id={task.id}
                text={task.text}
                finished={task.finished}
              />
            ))}
      </ul>
      <button className={classes.all} onClick={finishAllClick}>
        Finish all tasks
      </button>
      <TasksNew userId={userId} />
    </div>
  )
}

import type { FC } from 'react'

import { TasksItem } from './Item'
import { TasksNew } from './New'
import classes from './index.module.css'

// Step 10: Load hooks for Logux SyncMap
import { useFilter } from '@logux/client/react'
import { Task } from '../stores/task'

export const Tasks: FC<{ userId: string }> = ({ userId }) => {
  function finishAll() {}

  // Step 11: Load tasks from server
  let tasks = useFilter(Task, { userId })

  return (
    <div className={classes.body}>
      <ul className={classes.list}>
        {/*
        <TasksItem text="First" finished={false} />
        <TasksItem text="First" finished={true} />
        */}
        {tasks.isLoading
          ? 'Loading…'
          : tasks.isEmpty
          ? 'No tasks'
          : tasks.list.map(task => (
              <TasksItem
                key={task.id}
                text={task.text}
                finished={task.finished}
              />
            ))}
      </ul>
      <button className={classes.all} onClick={finishAll}>
        Finish all tasks
      </button>
      <TasksNew />
    </div>
  )
}

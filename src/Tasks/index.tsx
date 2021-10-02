import type { FC } from 'react'

import { TasksItem } from './Item'
import { TasksNew } from './New'
import classes from './index.module.css'

export const Tasks: FC<{ userId: string }> = ({ userId }) => {
  return (
    <div className={classes.body}>
      <ul className={classes.list}>
        <TasksItem text="First" finished={false} />
        <TasksItem text="First" finished={true} />
      </ul>
      <TasksNew />
    </div>
  )
}

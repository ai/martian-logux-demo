import type { FC, FormEvent } from 'react'

import classes from './index.module.css'

export const TasksNew: FC = () => {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const input = e.currentTarget.querySelector<HTMLInputElement>('input')
    if (input) {
      const text = input.value
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

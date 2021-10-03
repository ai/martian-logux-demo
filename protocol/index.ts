// Step 1: Create shared folder for protocol

// import { defineAction, defineSyncMapActions } from '@logux/actions'

// export const SUBPROTOCOL = '1.0.0'

export type TaskValue = {
  id: string
  userId: string
  text: string
  finished: boolean
}

// export const [
//   createTask,
//   changeTask,
//   deleteTask,
//   createdTask,
//   changedTask,
//   deletedTask
// ] = defineSyncMapActions<TaskValue>('tasks')

// export type CreateTask = ReturnType<typeof createTask>
// export type CreatedTask = ReturnType<typeof createdTask>
// export type DeleteTask = ReturnType<typeof deleteTask>
// export type DeletedTask = ReturnType<typeof deletedTask>

// Step 22: Add action for finish all

// export const finishAllTasks = defineAction('tasks/finishAll')

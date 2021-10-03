import { defineAction, defineSyncMapActions } from '@logux/actions'

// Step 1: Create shared folder for protocol

export const SUBPROTOCOL = '1.0.0'

export type TaskValue = {
  id: string
  userId: string
  text: string
  finished: boolean
}

export const [
  createTask,
  changeTask,
  deleteTask,
  createdTask,
  changedTask,
  deletedTask
] = defineSyncMapActions<TaskValue>('tasks')

// Step 22: Add action for finish all

export const finishAllTasksAction = defineAction('tasks/finishAll')

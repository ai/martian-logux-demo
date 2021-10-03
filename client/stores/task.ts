// Step 9: Create SyncMap template

import { defineSyncMap } from '@logux/client'
import { TaskValue } from '../../protocol'

export const Task = defineSyncMap<TaskValue>('tasks')

// Step 23: Define store’s action function

import { finishAllTasksAction } from '../../protocol'
import type { Client } from '@logux/client'

export function finishAllTasks(client: Client) {
  return client.sync(finishAllTasksAction({}))
}

// Step 25: In reactive way describe reaction separatly from action

import { changeSyncMapById } from '@logux/client'
import { createdTask, createTask, deletedTask, deleteTask } from '../../protocol'

export function bindFinishAllTask(client: Client) {
  client.type(finishAllTasksAction.type, (action, meta) => {
    console.log(TASKS_BY_CREATION_TIME)
    for (let [id, created] of TASKS_BY_CREATION_TIME.entries()) {
      console.log(id, created, created <= meta.time)
      if (created <= meta.time) {
        changeSyncMapById(client, Task, id, { finished: true })
      }
    }
  })

  const TASKS_BY_CREATION_TIME: Map<string, number> = new Map()

  client.type(
    createdTask.type,
    (action: ReturnType<typeof createdTask>, meta) => {
      TASKS_BY_CREATION_TIME.set(action.id, meta.time)
    }
  )

  client.type(
    createTask.type,
    (action: ReturnType<typeof createTask>, meta) => {
      TASKS_BY_CREATION_TIME.set(action.id, meta.time)
    }
  )

  client.type(
    deletedTask.type,
    (action: ReturnType<typeof deletedTask>, meta) => {
      TASKS_BY_CREATION_TIME.delete(action.id)
    }
  )

  client.type(
    deleteTask.type,
    (action: ReturnType<typeof deleteTask>, meta) => {
      TASKS_BY_CREATION_TIME.delete(action.id)
    }
  )
}

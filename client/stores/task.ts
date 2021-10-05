// Step 9: Create SyncMap template

import { defineSyncMap } from '@logux/client'
import { TaskValue } from '../../protocol'

export const Task = defineSyncMap<TaskValue>('tasks')

// Step 23: Define store’s action function

import {
  finishAllTasks,
  CreatedTask,
  CreateTask,
  DeletedTask,
  DeleteTask
} from '../../protocol'
import type { Client } from '@logux/client'

export function finishAll(client: Client) {
  return client.sync(finishAllTasks({}))
}

// Step 25: In reactive way describe reaction separatly from action

import { changeSyncMapById } from '@logux/client'
import {
  createdTask,
  createTask,
  deletedTask,
  deleteTask
} from '../../protocol'

export function bindFinishAllTask(client: Client) {
  client.type(finishAllTasks.type, (action, meta) => {
    console.log(TASKS_BY_CREATION_TIME)
    for (let [id, created] of TASKS_BY_CREATION_TIME.entries()) {
      console.log(id, created, created <= meta.time)
      if (created <= meta.time) {
        changeSyncMapById(client, Task, id, { finished: true })
      }
    }
  })

  const TASKS_BY_CREATION_TIME: Map<string, number> = new Map()

  client.type<CreatedTask>(createdTask.type, (action, meta) => {
    TASKS_BY_CREATION_TIME.set(action.id, meta.time)
  })

  client.type<CreateTask>(createTask.type, (action, meta) => {
    TASKS_BY_CREATION_TIME.set(action.id, meta.time)
  })

  client.type<DeletedTask>(deletedTask.type, action => {
    TASKS_BY_CREATION_TIME.delete(action.id)
  })

  client.type<DeleteTask>(deleteTask.type, action => {
    TASKS_BY_CREATION_TIME.delete(action.id)
  })
}

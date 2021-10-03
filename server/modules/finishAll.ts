import type { Server } from '@logux/server'

import {
  finishAllTasksAction,
  createTask,
  deleteTask
} from '../../protocol/index.js'
import { TASKS } from './tasks.js'

export default (server: Server) => {
  // Step 27: Add finish all support to server
  const TASKS_BY_CREATION_TIME: Map<string, number> = new Map()

  server.type(finishAllTasksAction, {
    access() {
      return true
    },
    resend() {
      return 'tasks'
    },
    process(ctx, acion, meta) {
      for (let [id, created] of TASKS_BY_CREATION_TIME.entries()) {
        if (created <= meta.time) {
          let task = TASKS.get(id)
          if (task?.userId === ctx.userId) {
            task.finished = true
          }
        }
      }
    }
  })

  server.log.type(
    createTask.type,
    (action: ReturnType<typeof createTask>, meta) => {
      TASKS_BY_CREATION_TIME.set(action.id, meta.time)
    }
  )

  server.log.type(
    deleteTask.type,
    (action: ReturnType<typeof deleteTask>, meta) => {
      TASKS_BY_CREATION_TIME.delete(action.id)
    }
  )
}

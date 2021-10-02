import type { Server } from '@logux/server'
import { defineSyncMapActions } from '@logux/actions'

import type { TaskValue } from '../../protocol'

const [
  createTask,
  changeTask,
  deleteTask,
  createdTask,
  changedTask,
  deletedTask
] = defineSyncMapActions<TaskValue>('tasks')

const TASKS: TaskValue[] = []

function getTask(id: string): TaskValue | undefined {
  return TASKS.find(task => task.id === id)
}

export default (server: Server) => {
  // Step 12: Add channel
  server.channel('tasks', {
    access(ctx, action) {
      return ctx.userId === action.filter?.userId
    },
    filter(ctx, action) {
      let filterId = action.filter?.userId as string
      return (otherCtx, otherAction) => {
        if (createdTask.match(otherAction)) {
          return otherAction.fields.userId === filterId
        } else {
          return getTask(filterId)?.userId === ctx.userId
        }
      }
    },
    load(ctx, action) {
      return TASKS.filter(task => action.filter?.userId).map(task => {
        let { id, ...fields } = task
        return createTask({ id, fields })
      })
    }
  })

  server.channel<{ id: string }>('tasks/:id', {
    access(ctx) {
      return getTask(ctx.params.id)?.userId === ctx.userId
    },
    load(ctx) {
      let { id, ...fields } = getTask(ctx.params.id)!
      return createTask({ id, fields })
    }
  })
}

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

export const TASKS: Map<string, TaskValue> = new Map()

export default (server: Server) => {
  // Step 12: Add channel

  server.channel('tasks', {
    access(ctx, action) {
      return ctx.userId === action.filter?.userId
    },
    filter(ctx, action) {
      let filterId = action.filter?.userId as string
      return (otherCtx, otherAction) => otherCtx.userId === ctx.userId
    },
    load(ctx, action) {
      return Array.from(TASKS.values())
        .filter(task => action.filter?.userId)
        .map(task => {
          let { id, ...fields } = task
          return createTask({ id, fields })
        })
    }
  })

  server.channel<{ id: string }>('tasks/:id', {
    access(ctx) {
      return TASKS.get(ctx.params.id)?.userId === ctx.userId
    },
    load(ctx) {
      let { id, ...fields } = TASKS.get(ctx.params.id)!
      return createTask({ id, fields })
    }
  })

  // Step 16: Add operations with tasks

  server.type(createTask, {
    access(ctx, action) {
      return ctx.userId === action.fields.userId
    },
    async process(ctx, action) {
      TASKS.set(action.id, { id: action.id, ...action.fields })
      await server.process(
        createdTask({ id: action.id, fields: action.fields })
      )
    }
  })

  server.type(createdTask, {
    access() {
      return false
    },
    resend(ctx, action) {
      return ['tasks', `tasks/${action.id}`]
    }
  })

  server.type(changeTask, {
    access(ctx, action) {
      return ctx.userId === TASKS.get(action.id)?.userId
    },
    async process(ctx, action) {
      TASKS.set(action.id, { ...TASKS.get(action.id)!, ...action.fields })
      await server.process(
        changedTask({ id: action.id, fields: action.fields })
      )
    }
  })

  server.type(changedTask, {
    access() {
      return false
    },
    resend(ctx, action) {
      return ['tasks', `tasks/${action.id}`]
    }
  })

  server.type(deleteTask, {
    access(ctx, action) {
      return ctx.userId === TASKS.get(action.id)?.userId
    },
    async process(ctx, action) {
      TASKS.delete(action.id)
      await server.process(deletedTask({ id: action.id }))
    }
  })

  server.type(deletedTask, {
    access() {
      return false
    },
    resend(ctx, action) {
      return ['tasks', `tasks/${action.id}`]
    }
  })
}

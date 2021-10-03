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

let TASKS: TaskValue[] = []

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

  // Step 16: Add operations with tasks

  server.type(createTask, {
    access(ctx, action) {
      return ctx.userId === action.fields.userId
    },
    async process(ctx, action) {
      TASKS.push({ id: action.id, ...action.fields })
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
      return ctx.userId === getTask(action.id)?.userId
    },
    async process(ctx, action) {
      TASKS = TASKS.map(task => {
        if (task.id === action.id) {
          return { ...task, ...action.fields }
        } else {
          return task
        }
      })
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
      return ctx.userId === getTask(action.id)?.userId
    },
    async process(ctx, action) {
      TASKS = TASKS.filter(task => task.id !== action.id)
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

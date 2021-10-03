import type { Server } from '@logux/server'
import { delay } from 'nanodelay'
import {
  TaskValue
  // createTask,
  // changeTask,
  // deleteTask,
  // createdTask,
  // changedTask,
  // deletedTask
} from '../../protocol/index.js'

export const TASKS: Map<string, TaskValue> = new Map()

export default (server: Server) => {
  // Step 12: Add channel to load ddata
  // server.channel('tasks', {
  //   access(ctx, action) {
  //     return ctx.userId === action.filter?.userId
  //   },
  //   filter(ctx, action) {
  //     return (otherCtx, otherAction) => {
  //       if (createdTask.match(otherAction)) {
  //         return otherAction.fields?.userId === ctx.userId
  //       } else if (
  //         deletedTask.match(otherAction) ||
  //         changedTask.match(otherAction)
  //       ) {
  //         return TASKS.get(otherAction.id)?.userId === ctx.userId
  //       } else {
  //         return otherCtx.userId === ctx.userId
  //       }
  //     }
  //   },
  //   load(ctx, action) {
  //     return Array.from(TASKS.values())
  //       .filter(task => action.filter?.userId)
  //       .map(task => {
  //         let { id, ...fields } = task
  //         return createdTask({ id, fields })
  //       })
  //   }
  // })
  // server.channel<{ id: string }>('tasks/:id', {
  //   access(ctx) {
  //     return true
  //   }
  // })
  // Step 16: Add operations for tasks
  // server.type(createTask, {
  //   access(ctx, action) {
  //     return ctx.userId === action.fields.userId
  //   },
  //   async process(ctx, action) {
  //     TASKS.set(action.id, { id: action.id, ...action.fields })
  //     await server.process(
  //       createdTask({ id: action.id, fields: action.fields })
  //     )
  //   }
  // })
  // server.type(createdTask, {
  //   access() {
  //     return false
  //   },
  //   resend(ctx, action) {
  //     return ['tasks', `tasks/${action.id}`]
  //   }
  // })
  // server.type(changeTask, {
  //   async access(ctx, action) {
  //     await delay(1)
  //     return ctx.userId === TASKS.get(action.id)?.userId
  //   },
  //   async process(ctx, action) {
  //     TASKS.set(action.id, { ...TASKS.get(action.id)!, ...action.fields })
  //     await server.process(
  //       changedTask({ id: action.id, fields: action.fields })
  //     )
  //   }
  // })
  // server.type(changedTask, {
  //   access() {
  //     return false
  //   },
  //   resend(ctx, action) {
  //     return ['tasks', `tasks/${action.id}`]
  //   }
  // })
  // server.type(deleteTask, {
  //   access(ctx, action) {
  //     return ctx.userId === TASKS.get(action.id)?.userId
  //   },
  //   async process(ctx, action) {
  //     TASKS.delete(action.id)
  //     await server.process(deletedTask({ id: action.id }))
  //   }
  // })
  // server.type(deletedTask, {
  //   access() {
  //     return false
  //   },
  //   resend(ctx, action) {
  //     return ['tasks', `tasks/${action.id}`]
  //   }
  // })
}

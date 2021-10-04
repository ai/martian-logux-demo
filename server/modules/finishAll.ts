import type { Server } from '@logux/server'

// import {
//   finishAllTasks,
//   createTask,
//   deleteTask,
//   CreateTask,
//   DeleteTask
// } from '../../protocol/index.js'
// import { TASKS } from './tasks.js'

export default (server: Server) => {
  // Step 27: Add finish all support to server
  // const TASKS_BY_CREATION_TIME: Map<string, number> = new Map()

  // server.type(finishAllTasks, {
  //   access() {
  //     return true
  //   },
  //   resend() {
  //     return 'tasks'
  //   },
  //   process(ctx, acion, meta) {
  //     for (let [id, created] of TASKS_BY_CREATION_TIME.entries()) {
  //       if (created <= meta.time) {
  //         let task = TASKS.get(id)
  //         if (task?.userId === ctx.userId) {
  //           task.finished = true
  //         }
  //       }
  //     }
  //   }
  // })

  // server.log.type<CreateTask>(createTask.type, (action, meta) => {
  //   TASKS_BY_CREATION_TIME.set(action.id, meta.time)
  // })

  // server.log.type<DeleteTask>(deleteTask.type, action => {
  //   TASKS_BY_CREATION_TIME.delete(action.id)
  // })
}

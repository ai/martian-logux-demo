import { Server } from '@logux/server'

import { SUBPROTOCOL } from '../protocol/index.js'

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: SUBPROTOCOL,
    supports: SUBPROTOCOL
  })
)

server.auth(({ userId, cookie }) => {
  if (userId === '10') {
    return true
  } else {
    return cookie['token'] === `${userId}:good`
  }
})

server.listen()

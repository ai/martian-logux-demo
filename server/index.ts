import { Server } from '@logux/server'

import { SUBPROTOCOL } from '../protocol/index.js'

// Step 2: Create server

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: SUBPROTOCOL,
    supports: SUBPROTOCOL,
    fileUrl: import.meta.url
  })
)

// Step 3: Add authentificator

server.auth(({ userId, cookie }) => {
  if (userId === '10') {
    return true
  } else {
    return cookie['token'] === `${userId}:good`
  }
})

server.autoloadModules()

server.listen()

import type { Server } from '@logux/server'

export default (server: Server) => {
  server.http((req, res) => {
    if (req.url === '/login') {
      res.setHeader('Set-Cookie', 'token=good; HttpOnly')
      res.end()
    }
  })
}

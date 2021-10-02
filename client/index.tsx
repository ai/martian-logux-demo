import React, { FC } from 'react'
import ReactDOM from 'react-dom'

import { Tasks } from './Tasks'
import './index.css'

// Step 4: Import Logux Client and protocol
import { CrossTabClient } from '@logux/client'
import { SUBPROTOCOL } from '../protocol'

// Step 6: Import widget
import { badge, badgeEn } from '@logux/client'
import { badgeStyles } from '@logux/client/badge/styles'

import { ClientContext, ChannelErrors } from '@logux/client/react'

const USER_ID = '10'

// Step 5: Create client and connect
const client = new CrossTabClient({
  server: 'ws://localhost:31337',
  subprotocol: SUBPROTOCOL,
  userId: USER_ID
})

client.start()

// Step 7: Add widget
badge(client, {
  messages: badgeEn,
  styles: badgeStyles
})

// const App: FC = () => {
//   return <Tasks userId={USER_ID} />
// }

// Step 8: Add client to React and provide common error pages
const Page403: FC = () => <div className="error">403</div>
const Page404: FC = () => <div className="error">404</div>
const Page500: FC = () => <div className="error">500</div>

const App: FC = () => {
  return (
    <ClientContext.Provider value={client}>
      <ChannelErrors AccessDenied={Page403} NotFound={Page404} Error={Page500}>
        <Tasks userId={USER_ID} />
      </ChannelErrors>
    </ClientContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

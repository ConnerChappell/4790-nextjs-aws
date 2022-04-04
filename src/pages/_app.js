import '../styles/globals.css'
import { Amplify, Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import config from '../aws-exports'

Amplify.configure(config)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withAuthenticator(MyApp)

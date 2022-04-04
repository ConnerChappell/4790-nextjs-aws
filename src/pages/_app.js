import '../styles/globals.css'
import { Amplify, Auth } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import config from '../aws-exports'
import ResponsiveAppBar from '../components/ResponsiveAppBar'

Amplify.configure(config)

const formFields = {
  signUp: {
    email: {
      order: 1
    },
    preferred_username: {
      placeholder: 'Preferred Username',
      required: true,
      order: 2,
    },
    password: {
      order: 3
    },
    confirm_password: {
      order: 4
    },
  },
}

function MyApp({ Component, pageProps }) {
    return (
        <Authenticator variation='modal' formFields={formFields}>
            {({ signOut, user }) => (
                <>
                    <ResponsiveAppBar user={user} signOut={signOut} />
                    <Component {...pageProps} />
                </>
            )}
        </Authenticator>
    )
}

export default MyApp

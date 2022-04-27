import Head from 'next/head'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { Typography } from '@mui/material'

export default function Home() {
    const { user } = useAuthenticator((context) => [context.user])
    console.log(user)

    return (
        <div>
            <Head>
                <title>Sports Browser App</title>
            </Head>

            <main>
            <Typography variant='h3' component='h1' sx={{textAlign: 'center',}}>
                    Welcome to my Next.js Sports App {user.attributes?.preferred_username}
            </Typography>
            </main>
        </div>
    )
}

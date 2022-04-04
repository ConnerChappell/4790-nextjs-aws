import Head from 'next/head'
import { Typography } from '@mui/material'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Sports Browser App</title>
            </Head>

            <main>
            <Typography variant='h3' component='h1' sx={{textAlign: 'center',}}>
                    Welcome to my Next.js Sports App
            </Typography>
            </main>
        </div>
    )
}

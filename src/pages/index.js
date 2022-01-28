import Head from 'next/head'
import ResponsiveAppBar from '../components/ResponsiveAppBar'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Sports Browser App</title>
            </Head>

            <main>
                <ResponsiveAppBar />
                <h1>Welcome to my Next.js App!</h1>
            </main>
        </div>
    )
}

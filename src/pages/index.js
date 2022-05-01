import Head from 'next/head'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { Box, Typography } from '@mui/material'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import SportsFootballIcon from '@mui/icons-material/SportsFootball'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball'
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball'
import SportsHockeyIcon from '@mui/icons-material/SportsHockey'

export default function Home() {
    const { user } = useAuthenticator((context) => [context.user])
    console.log(user)

    return (
        <div>
            <Head>
                <title>Sports Browser App</title>
            </Head>

            <main>
                <Typography sx={{ textAlign: 'center', fontSize: 72, mt: 4 }}>
                    Next.js Sports App
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        mt: 2,
                    }}>
                    <SportsSoccerIcon sx={{ fontSize: 48 }} />
                    <SportsFootballIcon sx={{ fontSize: 48 }} />
                    <SportsHockeyIcon sx={{ fontSize: 48 }} />
                    <SportsBasketballIcon sx={{ fontSize: 48 }} />
                    <SportsBaseballIcon sx={{ fontSize: 48 }} />
                </Box>

                <Typography
                    variant="h2"
                    sx={{ textAlign: 'center', fontSize: 48, mt: 10 }}>
                    Welcome {user.attributes?.preferred_username}
                </Typography>

                <Typography
                    // variant="h2"
                    sx={{ textAlign: 'center', fontSize: 36, mx: 4, }}>
                    Head over to the TEAMS page and search for your favorite teams to add!
                </Typography>
            </main>
        </div>
    )
}

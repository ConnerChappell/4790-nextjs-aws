import * as React from 'react'
import useSWR from 'swr'
import Amplify, { DataStore } from 'aws-amplify'
import config from '../../aws-exports'
import { TeamData } from '../../models'
// import { createTeamData, deleteTeamData } from '../../graphql/mutations'
// import { listTeamData } from '../../graphql/queries'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import {
    Box,
    Card,
    CardHeader,
    CardMedia,
    CardActions,
    IconButton,
    Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

Amplify.configure(config)

// 2. Nextjs will execute this component function AFTER getStaticProps
const TeamList = () => {
    const [teamList, setTeamList] = React.useState([])
    // console.log(teamList)

    // handles adding a team
  /*   const handleSaveTeam = async () => {
        console.log(`Gonna add the team: ${team.teams[0].strTeam} now`)
        const newTeamToSave = {
            idTeam: team.teams[0].idTeam,
            team: team.teams[0].strTeam,
            teamShort: team.teams[0].strTeamShort,
            teamBadge: team.teams[0].strTeamBadge,
            teamJersey: team.teams[0].strTeamJersey,
            teamLogo: team.teams[0].strTeamLogo,
            teamBanner: team.teams[0].strTeamBanner,
            teamDescriptionEn: team.teams[0].strDescriptionEN,
            formedYear: team.teams[0].intFormedYear,
            sport: team.teams[0].strSport,
            league: team.teams[0].strLeague,
            idLeague: team.teams[0].idLeague,
            stadium: team.teams[0].strStadium,
            stadiumThumb: team.teams[0].strStadiumThumb,
            stadiumDescription: team.teams[0].strStadiumDescription,
            stadiumLocation: team.teams[0].strStadiumLocation,
            stadiumCapacity: team.teams[0].intStadiumCapacity,
            website: team.teams[0].strWebsite,
            facebook: team.teams[0].strFacebook,
            twitter: team.teams[0].strTwitter,
            instagram: team.teams[0].strInstagram,
            youtube: team.teams[0].strYoutube,
            manager: team.teams[0].strManager,
            country: team.teams[0].strCountry,
        }

        try {
            const response = await API.graphql({
                query: createTeamData,
                variables: { input: newTeamToSave },
                authMode: 'API_KEY',
            })
            console.log('Created a new team')
            console.log(response)
        } catch (error) {
            console.log('Save team error', error)
        }
    } */

    // handles deleting a team using DataStore
    const handleDeleteTeam = async (team) => {
        try {
            const teamToDelete = await DataStore.query(TeamData, team.id)
            console.log(teamToDelete)
            await DataStore.delete(teamToDelete)
        } catch (error) {
            console.log("Delete team error: ", error)
        }
    }

    const fetcher = async () => {
        try {
            let tempList = await DataStore.query(TeamData)
            setTeamList(tempList)
        } catch (error) {
            console.log("Retrieve team list error", error)
        }
        return teamList
    }
    const { data, error } = useSWR('/teams', fetcher, {refreshInterval: 100})

    if (error) return <div>Failed to load list of teams</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            <ResponsiveAppBar />
            <Typography variant='h3' component='h1' sx={{textAlign: 'center',}}>
                    Your Saved Teams:
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                {teamList && teamList.map((team) => (
                    <Card
                        key={team.id}
                        sx={{ maxWidth: 350, my: 3, mx: 1.5, boxShadow: 4 }}>
                        <CardHeader
                            avatar={
                                <CardMedia
                                    component="img"
                                    height="90"
                                    image={team.teamBadge}
                                />
                            }
                            title={team.team}
                            subheader={team.league}
                        />

                        <CardMedia
                            sx={{
                                mx: 'auto',
                                padding: '0 16px 16px 16px',
                                width: '100%',
                            }}
                            component="img"
                            image={team.teamJersey}
                            alt="Team Jersey"
                        />

                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteTeam(team)}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </>
    )
}

// 1. Nextjs will execute this function first. It is never visible to the client
/* export async function getStaticProps() {
    let teamList = []

    try {
        const response = await API.graphql({
            query: listTeamData,
            authMode: 'API_KEY',
        })
        teamList = response.data.listTeamData.items
    } catch (error) {
        console.log('Retrieve team list error', error)
    }

    return {
        props: {
            teamList,
        },
        revalidate: 10
    }
} */

export default TeamList

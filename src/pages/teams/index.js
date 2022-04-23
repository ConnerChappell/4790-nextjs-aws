import * as React from 'react'
import useSWR from 'swr'
import { DataStore } from 'aws-amplify'
import { TeamData } from '../../models'
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

// 2. Nextjs will execute this component function AFTER getStaticProps
const TeamList = () => {
    const [teamList, setTeamList] = React.useState([])
    // console.log(teamList)

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
            <Typography variant='h3' component='h1' sx={{textAlign: 'center',}}>
                    Saved Teams:
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

import * as React from 'react'
import useSWR from 'swr'
import Amplify, { DataStore, AuthModeStrategyType } from 'aws-amplify'
import { useAuthenticator } from '@aws-amplify/ui-react'
import config from '../../aws-exports'
import { TeamData } from '../../models'
import {
    Box,
    Card,
    CardHeader,
    CardMedia,
    CardActions,
    IconButton,
    Typography,
    Snackbar,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

// amplify configure multi auth stuff
Amplify.configure({
    ...config,
    DataStore: {
        authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
    },
})

// 2. Nextjs will execute this component function AFTER getStaticProps
const TeamList = () => {
    const [teamList, setTeamList] = React.useState([])
    // console.log(teamList)
    const { user } = useAuthenticator((context) => [context.user])
    // snackbar states
    const [openSnackbar, setOpenSnackbar] = React.useState(false)
    const [snackbarMessage, setSnackbarMessage] = React.useState('')
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('')

    // snackbar handlers
    const handleToast = (message, severity) => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity)
        setOpenSnackbar(true)
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSnackbar(false)
    }

    // handles deleting a team using DataStore
    const handleDeleteTeam = async (team) => {
        try {
            handleToast(`The team: "${team.team}" was deleted`, 'success')

            const teamToDelete = await DataStore.query(TeamData, team.id)
            console.log(teamToDelete)
            await DataStore.delete(teamToDelete)
        } catch (error) {
            console.log('Delete team error: ', error)
            handleToast(`Error: could not delete team`, 'error')
        }
    }

    const fetcher = async () => {
        try {
            let tempList = await DataStore.query(TeamData)
            setTeamList(tempList)
        } catch (error) {
            console.log('Retrieve team list error', error)
        }
        return teamList
    }
    const { data, error } = useSWR('/teams', fetcher, { refreshInterval: 100 })

    if (error) return <div>Failed to load list of teams</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            <Typography
                variant="h3"
                component="h1"
                sx={{ textAlign: 'center' }}>
                Saved Teams:
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                {teamList &&
                    teamList.map((team) => (
                        <Card
                            key={team.id}
                            sx={{
                                maxWidth: 350,
                                my: 3,
                                mx: 1.5,
                                boxShadow: 4,
                            }}>
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
                                {user.username === team.owner && (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleDeleteTeam(team)}>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </CardActions>
                        </Card>
                    ))}
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </>
    )
}

export default TeamList

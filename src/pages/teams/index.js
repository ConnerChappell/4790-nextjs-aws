import * as React from 'react'
import Amplify, { API } from 'aws-amplify'
import config from '../../aws-exports'
import { getTeamByName } from '../../utils/api-util'
import { createTeamData } from '../../graphql/mutations'
import { listTeamData } from '../../graphql/queries'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import { styled } from '@mui/material/styles'
import {
    Box,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

Amplify.configure(config)

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

// 2. Nextjs will execute this component function AFTER getStaticProps
const TeamList = (props) => {
    const [expanded, setExpanded] = React.useState(false)

    const { teamList } = props
    console.log(teamList)

    // handles adding a team
    const handleSaveTeam = async () => {
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
    }

    // handles deleting a team
    const handleDeleteTeam = () => {
        console.log('Got to delete this team')
    }

    // handles expand for more team info click
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <>
            <ResponsiveAppBar />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                {teamList.map((team) => (
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
                                aria-label="add"
                                onClick={handleSaveTeam}>
                                <AddIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                onClick={handleDeleteTeam}>
                                <DeleteIcon />
                            </IconButton>

                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more">
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>

                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    Founded: {team.formedYear}
                                </Typography>

                                <Typography gutterBottom variant="h6">
                                    Stadium: {team.stadium}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    width="auto"
                                    image={team.stadiumThumb}
                                    alt="Team Stadium"
                                />
                                <Typography gutterBottom variant="h6">
                                    Capacity: {team.stadiumCapacity}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                ))}
            </Box>
        </>
    )
}

// 1. Nextjs will execute this function first. It is never visible to the client
export async function getStaticProps() {
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
    }

    // const fetchedTeam = await getTeamByName('Seattle Seahawks')

    // return {
    //     props: {
    //         team: fetchedTeam,
    //     },
    // }
}

export default TeamList

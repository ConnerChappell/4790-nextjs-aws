import * as React from 'react'
import { getTeamByName } from '../../utils/api-util'
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
    const { team } = props


    // handles adding a team
    const handleAddTeam = () => {
        console.log('Gonna add this team eventually')
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ maxWidth: 350, mt: 5, mb: 5, boxShadow: 4 }}>
                    <CardHeader
                        avatar={
                            <CardMedia
                                component="img"
                                height="90"
                                image={team.teams[0].strTeamBadge}
                            />
                        }
                        title={team.teams[0].strTeam}
                        subheader={team.teams[0].strLeague}
                    />

                    <CardMedia
                        sx={{
                            mx: 'auto',
                            padding: '0 16px 16px 16px',
                            width: '100%',
                        }}
                        component="img"
                        image={team.teams[0].strTeamJersey}
                        alt="Team Jersey"
                    />

                    <CardActions disableSpacing>
                        <IconButton aria-label="add" onClick={handleAddTeam} >
                            <AddIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleDeleteTeam} >
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
                                Founded: {team.teams[0].intFormedYear}
                            </Typography>

                            <Typography gutterBottom variant="h6">
                                Head Coach: {team.teams[0].strManager}
                            </Typography>

                            <Typography gutterBottom variant="h6">
                                Stadium: {team.teams[0].strStadium}
                            </Typography>
                            <CardMedia
                                component="img"
                                width="auto"
                                image={team.teams[0].strStadiumThumb}
                                alt="Team Stadium"
                            />
                            <Typography gutterBottom variant="h6">
                                Capacity: {team.teams[0].intStadiumCapacity}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Box>
        </>
    )
}

// 1. Nextjs will execute this function first. It is never visible to the client
export async function getStaticProps() {
    const fetchedTeam = await getTeamByName('Seattle%Seahawks')

    return {
        props: {
            team: fetchedTeam,
        },
    }
}

export default TeamList

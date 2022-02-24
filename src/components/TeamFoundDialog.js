import {
    // Box,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Dialog,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const TeamFoundDialog = (props) => {
    const { open, teams, onSaveTeam, onClose } = props

    return (
        <Dialog maxWidth="sm" open={open} onClose={onClose}>
            {teams.map((team) => (
                <Card
                    key={team.idTeam}
                    sx={{ maxWidth: 225, my: 3, mx: 3, boxShadow: 4 }}>
                    <CardMedia
                        sx={{
                            mt: 2,
                            mx: 'auto',
                            padding: '0 16px 0 16px',
                            width: '100%',
                        }}
                        component="img"
                        image={team.strTeamBadge}
                        alt="Team Badge"
                    />

                    <CardContent sx={{ padding: '0', margin: '0 16px 0 16px' }}>
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>
                            {team.strTeam}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <IconButton aria-label="save" onClick={onSaveTeam}>
                            <AddIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </Dialog>
    )
}

export default TeamFoundDialog

import * as React from 'react'
import {
    // Box,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const TeamFoundDialog = (props) => {
    const { open, teams, onSaveTeam, onClose } = props

    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            scroll="paper"
            open={open}
            onClose={onClose}>
            <DialogTitle>Teams:</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {teams && teams.map((team) => (
                    <Card
                        key={team.idTeam}
                        sx={{ maxWidth: 225, my: 3, mx: 3, boxShadow: 4, padding: '16px 0 0 0' }}>
                        <CardMedia
                            sx={{
                                mt: 0,
                                mx: 'auto',
                                padding: '0',
                                width: '85%',
                            }}
                            component="img"
                            image={team.strTeamBadge}
                            alt="Team Badge"
                        />

                        <CardContent
                            sx={{ padding: '0', margin: '.5rem 0 0 0' }}>
                            <Typography
                                variant="h6"
                                sx={{ textAlign: 'center' }}>
                                {team.strTeam}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textAlign: 'center' }}>
                                {team.strLeague}
                            </Typography>
                        </CardContent>

                        <CardActions disableSpacing sx={{mt: 1, mb: 0, }}>
                            <IconButton data-team={JSON.stringify(team)} aria-label="save" onClick={onSaveTeam}>
                                <AddIcon data-team={JSON.stringify(team)} />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </DialogContent>
        </Dialog>
    )
}

export default TeamFoundDialog

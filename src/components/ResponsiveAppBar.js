import * as React from 'react'
import Link from 'next/link'
import { DataStore } from 'aws-amplify'
import TeamFoundDialog from './TeamFoundDialog'
import { styled, alpha } from '@mui/material/styles'
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    InputBase,
    Snackbar,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { TeamData } from '../models'

// search field style stuff start
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: 0,
    marginRight: 20,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: '8px',
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}))
// search field style stuff end

const ResponsiveAppBar = ({ user, signOut }) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [fetchedTeams, setFetchedTeams] = React.useState([])
    const [searchTerms, setSearchTerms] = React.useState('')
    const [dialog, setDialog] = React.useState({
        isOpen: false,
        teams: undefined,
    })
    // Snackbar states
    const [openSnackbar, setOpenSnackbar] = React.useState(false)
    const [snackbarMessage, setSnackbarMessage] = React.useState('')
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('')

    // user menu handlers
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const handleSignOut = async () => {
        await DataStore.clear()
        signOut()
    }

    // search field handlers
    const handleChange = (event) => {
        setSearchTerms(event.target.value)
    }
    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }
    const handleSearch = async () => {
        if (!searchTerms) return
        const sportsDbTeam = await fetch('/api/team', {
            method: 'POST',
            body: JSON.stringify({ team: searchTerms }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setFetchedTeams(await sportsDbTeam.json())

        // const sportsDbTeam = await getTeamByName(searchTerms)
        // setFetchedTeams(sportsDbTeam.teams)
        // console.log(sportsDbTeam.teams)

        setDialog({
            isOpen: true,
            teams: fetchedTeams.teams,
        })
    }

    // close dialog handler
    const handleCloseDialog = () => {
        setDialog({
            isOpen: false,
        })
    }

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

    // save team handler
    const handleSaveTeam = async (event) => {
        // console.log(event.target.dataset.team)
        try {
            const teamToSave = JSON.parse(event.currentTarget.dataset.team)
            handleToast(`The team: "${teamToSave.strTeam}" was saved`, 'success')

            await DataStore.save(
                new TeamData({
                    idTeam: teamToSave.idTeam,
                    team: teamToSave.strTeam,
                    teamShort: teamToSave.strTeamShort,
                    teamBadge: teamToSave.strTeamBadge,
                    teamJersey: teamToSave.strTeamJersey,
                    teamLogo: teamToSave.strTeamLogo,
                    teamBanner: teamToSave.strTeamBanner,
                    teamDescriptionEn: teamToSave.strDescriptionEN,
                    formedYear: teamToSave.intFormedYear,
                    sport: teamToSave.strSport,
                    league: teamToSave.strLeague,
                    idLeague: teamToSave.idLeague,
                    stadium: teamToSave.strStadium,
                    stadiumThumb: teamToSave.strStadiumThumb,
                    stadiumDescription: teamToSave.strStadiumDescription,
                    stadiumLocation: teamToSave.strStadiumLocation,
                    stadiumCapacity: teamToSave.intStadiumCapacity,
                    website: teamToSave.strWebsite,
                    facebook: teamToSave.strFacebook,
                    twitter: teamToSave.strTwitter,
                    instagram: teamToSave.strInstagram,
                    youtube: teamToSave.strYoutube,
                    manager: teamToSave.strManager,
                    country: teamToSave.strCountry,
                })
            )
            console.log('Team was saved')
        } catch (err) {
            console.log('Save team error', err)
            handleToast(`Error: could not save team`, 'error')
        } finally {
            setDialog({
                isOpen: false,
            })
        }
    }

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#d00' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { md: 'flex' },
                            }}>
                            <Button
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                }}>
                                <Link href="/">Home</Link>
                            </Button>
                            <Button
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                }}>
                                <Link href="/teams">Teams</Link>
                            </Button>
                        </Box>

                        <Search>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleChange}
                                onKeyUp={handleKeyUp}
                                value={searchTerms}
                            />
                            <IconButton onClick={handleSearch}>
                                <SearchIcon sx={{ color: '#fff' }} />
                            </IconButton>
                        </Search>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        // src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}>
                                <MenuItem>Profile</MenuItem>
                                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <TeamFoundDialog
                open={dialog.isOpen}
                teams={fetchedTeams.teams}
                onClose={handleCloseDialog}
                onSaveTeam={handleSaveTeam}
            />

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
export default ResponsiveAppBar

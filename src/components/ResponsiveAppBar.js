import * as React from 'react'
import Link from 'next/link'
import { DataStore } from 'aws-amplify'
// import config from '../aws-exports'
import { getTeamByName } from '../utils/api-util'
// import { createTeamData } from '../graphql/mutations'
import TeamFoundDialog from './TeamFoundDialog'
import { styled, alpha } from '@mui/material/styles'
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    InputBase,
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

    // user menu handlers
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
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
        const sportsDbTeam = await getTeamByName(searchTerms)
        setFetchedTeams(sportsDbTeam.teams)
        console.log(sportsDbTeam.teams)

        setDialog({
            isOpen: true,
            teams: fetchedTeams,
        })
    }

    // close dialog handler
    const handleCloseDialog = () => {
        setDialog({
            isOpen: false,
        })
    }

    // save team handler
    const handleSaveTeam = async () => {
        console.log(fetchedTeams[0])
        try {
            await DataStore.save(
                new TeamData({
                    idTeam: fetchedTeams[0].idTeam,
                    team: fetchedTeams[0].strTeam,
                    teamShort: fetchedTeams[0].strTeamShort,
                    teamBadge: fetchedTeams[0].strTeamBadge,
                    teamJersey: fetchedTeams[0].strTeamJersey,
                    teamLogo: fetchedTeams[0].strTeamLogo,
                    teamBanner: fetchedTeams[0].strTeamBanner,
                    teamDescriptionEn: fetchedTeams[0].strDescriptionEN,
                    formedYear: fetchedTeams[0].intFormedYear,
                    sport: fetchedTeams[0].strSport,
                    league: fetchedTeams[0].strLeague,
                    idLeague: fetchedTeams[0].idLeague,
                    stadium: fetchedTeams[0].strStadium,
                    stadiumThumb: fetchedTeams[0].strStadiumThumb,
                    stadiumDescription: fetchedTeams[0].strStadiumDescription,
                    stadiumLocation: fetchedTeams[0].strStadiumLocation,
                    stadiumCapacity: fetchedTeams[0].intStadiumCapacity,
                    website: fetchedTeams[0].strWebsite,
                    facebook: fetchedTeams[0].strFacebook,
                    twitter: fetchedTeams[0].strTwitter,
                    instagram: fetchedTeams[0].strInstagram,
                    youtube: fetchedTeams[0].strYoutube,
                    manager: fetchedTeams[0].strManager,
                    country: fetchedTeams[0].strCountry,
                })
            )
            console.log('Team was saved')
        } catch (err) {
            console.log('Save team error', err)
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
                                <MenuItem onClick={signOut}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <TeamFoundDialog
                open={dialog.isOpen}
                teams={fetchedTeams}
                onClose={handleCloseDialog}
                onSaveTeam={handleSaveTeam}
            />
        </>
    )
}
export default ResponsiveAppBar

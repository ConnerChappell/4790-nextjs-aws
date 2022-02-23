import * as React from 'react'
import Link from 'next/link'
import Amplify, {API} from 'aws-amplify'
import config from '../aws-exports'
import { getTeamByName } from '../utils/api-util'
import { createTeamData } from '../graphql/mutations'
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

Amplify.configure(config)

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

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const ResponsiveAppBar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [fetchedTeam, setFetchedTeam] = React.useState({})
    const [searchTerms, setSearchTerms] = React.useState('')
    const [dialog, setDialog] = React.useState({
        isOpen: false,
        team: undefined,
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
    const handleSearch = async () => {
        const sportsDbTeam = await getTeamByName(searchTerms)
        setFetchedTeam(sportsDbTeam)
        console.log(sportsDbTeam)

        setDialog({
            isOpen: true,
            team: fetchedTeam,
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
        const newTeamToSave = {
            idTeam: fetchedTeam.teams[0].idTeam,
            team: fetchedTeam.teams[0].strTeam,
            teamShort: fetchedTeam.teams[0].strTeamShort,
            teamBadge: fetchedTeam.teams[0].strTeamBadge,
            teamJersey: fetchedTeam.teams[0].strTeamJersey,
            teamLogo: fetchedTeam.teams[0].strTeamLogo,
            teamBanner: fetchedTeam.teams[0].strTeamBanner,
            teamDescriptionEn: fetchedTeam.teams[0].strDescriptionEN,
            formedYear: fetchedTeam.teams[0].intFormedYear,
            sport: fetchedTeam.teams[0].strSport,
            league: fetchedTeam.teams[0].strLeague,
            idLeague: fetchedTeam.teams[0].idLeague,
            stadium: fetchedTeam.teams[0].strStadium,
            stadiumThumb: fetchedTeam.teams[0].strStadiumThumb,
            stadiumDescription: fetchedTeam.teams[0].strStadiumDescription,
            stadiumLocation: fetchedTeam.teams[0].strStadiumLocation,
            stadiumCapacity: fetchedTeam.teams[0].intStadiumCapacity,
            website: fetchedTeam.teams[0].strWebsite,
            facebook: fetchedTeam.teams[0].strFacebook,
            twitter: fetchedTeam.teams[0].strTwitter,
            instagram: fetchedTeam.teams[0].strInstagram,
            youtube: fetchedTeam.teams[0].strYoutube,
            manager: fetchedTeam.teams[0].strManager,
            country: fetchedTeam.teams[0].strCountry,
        }

        try {
            const response = await API.graphql({
                query: createTeamData,
                variables: { input: newTeamToSave},
                authMode: 'API_KEY'
            })
            console.log(response)
        } catch (err) {
            console.log("Save movie error", err)
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
                                <Link href="/teams">Teams</Link>
                            </Button>
                        </Box>

                        <Search>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleChange}
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
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <TeamFoundDialog open={dialog.isOpen} team={fetchedTeam} onClose={handleCloseDialog} onSaveTeam={handleSaveTeam} />
        </>
    )
}
export default ResponsiveAppBar

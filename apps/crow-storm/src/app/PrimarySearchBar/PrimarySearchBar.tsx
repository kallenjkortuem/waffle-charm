import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import ToolTip from '@material-ui/core/ToolTip'
import Typography from '@material-ui/core/Typography'
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium'
import MoreIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

const SUMMONER_NAME_KEY = 'summonerName'

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
)

export default function PrimarySearchBar(props: {
  onSearch: (
    event: React.FormEvent<HTMLFormElement>,
    summonerName: string
  ) => void
  onToggleTheme: () => void
}): React.ReactElement {
  const { t } = useTranslation()
  const { onSearch, onToggleTheme } = props
  const query = useQuery()
  const history = useHistory()

  const classes = useStyles()
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null)
  const [summonerName, setSummonerName] = useState(
    query.get(SUMMONER_NAME_KEY) ?? ''
  )

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={onToggleTheme}>
        <IconButton
          aria-label={t('toggleDarkTheme')}
          onClick={onToggleTheme}
          color="inherit"
        >
          <BrightnessMediumIcon />
        </IconButton>
        <p>{t('toggleDarkTheme')}</p>
      </MenuItem>
    </Menu>
  )

  const handleSetSummonerName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target
    setSummonerName(value)
    history.push(`/?${SUMMONER_NAME_KEY}=${value}`)
  }

  useEffect(() => {
    onSearch(null, summonerName)
  }, [])

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Fiddlestats
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={(event) => onSearch(event, summonerName)}>
              <InputBase
                placeholder={t('searchPlaceholder')}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={summonerName}
                inputProps={{ 'aria-label': t('searchPlaceholder') }}
                onChange={handleSetSummonerName}
              />
            </form>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <ToolTip
              title={t('toggleDarkTheme')}
              aria-label={t('toggleDarkTheme')}
            >
              <IconButton
                edge="end"
                onClick={onToggleTheme}
                color="inherit"
                data-cy="dark-mode"
              >
                <BrightnessMediumIcon />
              </IconButton>
            </ToolTip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  )
}

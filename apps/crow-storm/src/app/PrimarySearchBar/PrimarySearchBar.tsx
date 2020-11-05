import AppBar from '@material-ui/core/AppBar'
import InputBase from '@material-ui/core/InputBase'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import React, { useEffect, useState } from 'react'

const SUMMONER_NAME_KEY = 'summonerName'
const initialSummonerName = sessionStorage.getItem(SUMMONER_NAME_KEY) || ''

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
  })
)

export default function PrimarySearchBar(props: {
  onSearch: (
    event: React.FormEvent<HTMLFormElement>,
    summonerName: string
  ) => void
}): React.ReactElement {
  const { onSearch } = props

  const [summonerName, setSummonerName] = useState(initialSummonerName)

  const classes = useStyles()

  const handleSetSummonerName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target
    setSummonerName(value)
    sessionStorage.setItem(SUMMONER_NAME_KEY, value)
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
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={summonerName}
                inputProps={{ 'aria-label': 'summoner name search' }}
                onChange={handleSetSummonerName}
              />
            </form>
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

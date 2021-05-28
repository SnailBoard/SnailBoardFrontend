import React, { useEffect } from 'react'
import { Container, Grid, Grow } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import { useStyles } from './styles'
import SBCard, { CARD_TYPES } from './SBCard'

import {
  getTeamsStarted,
  teamsDataSelector,
  refreshSelector,
  boardsDataSelector,
} from './homeSlice'
import { setAuthorizationToken } from '../../core/api'
import { loadState } from '../../core/localStorage'
import { ACCESS_TOKEN_KEY } from '../../core/values/keys'
import { isFulfilledSelector as isAuthFulfilledSelector } from '../Auth/authSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const isAuthFulfilled = useSelector(isAuthFulfilledSelector)
  const refresh = useSelector(refreshSelector)
  useEffect(() => {
    if (isAuthFulfilled) {
      setAuthorizationToken(loadState(ACCESS_TOKEN_KEY))
      dispatch(getTeamsStarted())
    }
    console.log('Updated')
  }, [isAuthFulfilled, refresh])

  const classes = useStyles()
  return (
    <div className={classes.background}>
      <Header />
      <Container maxWidth="md" className={classes.cardContainer}>
        <Grid
          container
          spacing={8}
          justify="flex-start"
          alignItems="flex-start"
          className={classes.cardGrid}
        >
          <Grow in disableStrictModeCompat timeout={800}>
            <Grid item xs={6}>
              <SBCard
                itemsHeader="Boards"
                btnName="+ add boards"
                rowDataSelector={boardsDataSelector}
                cardType={CARD_TYPES.BOARD}
              />
            </Grid>
          </Grow>
          <Grow in disableStrictModeCompat timeout={1600}>
            <Grid item xs={6}>
              <SBCard
                itemsHeader="Teams"
                btnName="+ add teams"
                rowDataSelector={teamsDataSelector}
                cardType={CARD_TYPES.TEAM}
              />
            </Grid>
          </Grow>
        </Grid>
      </Container>
    </div>
  )
}

export default HomePage

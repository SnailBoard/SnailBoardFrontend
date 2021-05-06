import React from 'react'
import { Container, Grid, Grow } from '@material-ui/core'
import Header from '../../components/Header'
import { useStyles } from './styles'
import SBCard from './SBCard'

const boardsFixture = [
  {
    name: 'Dev board',
    membersCount: '2 members',
  },
  {
    name: 'Design board',
    membersCount: '4 members',
  },
  {
    name: 'Test board',
    membersCount: '1 member',
  },
]

const teamsFixture = [
  {
    name: 'Dev team',
    membersCount: '2 members',
  },
  {
    name: 'Design team',
    membersCount: '4 members',
  },
  {
    name: 'Test team',
    membersCount: '1 member',
  },
]

const HomePage = () => {
  const classes = useStyles()

  const getBoardsItemsCount = () => '2 boards'

  const getTeamsItemsCount = () => '2 teams'

  return (
    <>
      <Header />
      <Container maxWidth="md" className={classes.cardContainer}>
        <Grid
          container
          spacing={8}
          justify="flex-start"
          alignItems="center"
          className={classes.cardGrid}
        >
          <Grow in disableStrictModeCompat timeout={800}>
            <Grid item xs={6}>
              <SBCard
                itemsCount={getBoardsItemsCount()}
                itemsHeader="Boards"
                btnName="+ add boards"
                columnsData={boardsFixture}
              />
            </Grid>
          </Grow>
          <Grow in disableStrictModeCompat timeout={1600}>
            <Grid item xs={6}>
              <SBCard
                itemsCount={getTeamsItemsCount()}
                itemsHeader="Teams"
                btnName="+ add teams"
                columnsData={teamsFixture}
              />
            </Grid>
          </Grow>
        </Grid>
      </Container>
    </>
  )
}

export default HomePage

import React from 'react'
import { Grid } from '@material-ui/core'
import Header from '../../components/Header'
import { useStyles } from './styles'

const HomePage = () => {
  console.log('Ok')

  const classes = useStyles()
  return (
    <>
      <Header />
      <Grid
        container
        spacing={1}
        justify="flex-start"
        alignItems="center"
        className={classes.root}
      ></Grid>
    </>
  )
}

export default HomePage

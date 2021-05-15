import React from 'react'
import { Container } from '@material-ui/core'
import Header from '../../components/Header/Header'
import { useStyles } from './styles'

const Board = () => {
  const classes = useStyles()

  return (
    <div className={classes.background}>
      <Header boardName="development" />

      <Container maxWidth="md" className={classes.cardContainer}>
        Hello
      </Container>
    </div>
  )
}

export default Board

import { makeStyles } from '@material-ui/core'
import { THIRD_COLOR } from '../../core/values/colors'

export const useStyles = makeStyles(() => ({
  cardGrid: {},
  background: {
    background: THIRD_COLOR,
    height: '100vh',
  },
  cardContainer: {
    marginTop: '15vh',
  },
}))

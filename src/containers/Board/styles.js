import { makeStyles } from '@material-ui/core'
import { ACCENT2_COLOR, THIRD_COLOR } from '../../core/values/colors'

export const useStyles = makeStyles((theme) => ({
  background: {
    background: THIRD_COLOR,
    height: '100vh',
  },
  boardContainer: {
    marginTop: '3vh',
    marginBottom: '3vh',
    padding: 0,
  },
  header: {
    textAlign: 'center',
  },
  headerColumn: {
    paddingTop: '20px',
    paddingLeft: '20px',
  },
  cardColumn: {
    padding: '2vh',
  },
  cardPaper: {
    background: ACCENT2_COLOR,
  },
  input: {
    marginLeft: theme.spacing(3),
  },
  inputTextColor: {
    color: 'black',
  },
}))

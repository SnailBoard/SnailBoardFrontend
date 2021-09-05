import { makeStyles } from '@material-ui/core'
import { ACCENT_COLOR, TEXT_DIMMED_COLOR } from '../../../core/values/colors'

export const useStyles = makeStyles((theme) => ({
  addModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: 20,
    // width: '40vw',
    background: ACCENT_COLOR,
  },
  header: {
    color: TEXT_DIMMED_COLOR,
    margin: '20px 0px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

import { makeStyles } from '@material-ui/core'
import { PRIMARY_COLOR } from '../../core/values/colors'

export const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    justifyContent: 'center',
    justifyItems: 'center',
    color: 'white',
  },
  title: {
    flexGrow: 1,
    fontSize: 'medium',
  },
  appBar: {
    background: PRIMARY_COLOR,
  },
  btnLink: {
    color: '#fff',
    fontSize: 'medium',
    textTransform: 'none',
  },
  snailBtn: {
    justifyContent: 'center',
    justifyItems: 'center',
    margin: '10px',
    width: '95px',
    height: '60px',
  },
}))

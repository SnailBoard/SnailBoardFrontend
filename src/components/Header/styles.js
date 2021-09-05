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
    padding: '25px',
  },
  appBar: {
    background: PRIMARY_COLOR,
  },
  btnLink: {
    color: '#fff',
    fontSize: 'large',
    textTransform: 'none',
  },
  snailBtn: {
    justifyContent: 'center',
    justifyItems: 'center',
    margin: '10px',
    width: '95px',
    height: '60px',
  },
  boardLabel: {
    textAlign: 'center',
    color: PRIMARY_COLOR,
  },
  grow: {
    flexGrow: 1,
  },
  leftBlock: {
    display: 'flex',
    alignItems: 'center',
    width: '40%',
  },
  centralBlock: {
    display: 'flex',
    alignItems: 'center',
    width: '20%',
    justifyContent: 'center',
  },
  rightBlock: {
    display: 'flex',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'flex-end',
  },
}))

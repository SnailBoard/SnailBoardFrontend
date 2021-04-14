import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 50,
    height: '70vh',
    width: 500,
    margin: '20px auto',
  },
  element: {
    marginTop: 20,
    marginLeft: -10,
  },
  avatarLogin: {
    backgroundColor: '#1bbd7e',
  },
  avatarRegister: {
    backgroundColor: '#ffc900',
  },
  button: {
    marginTop: 50,
    marginLeft: -10,
  },
  mood: {
    padding: 5,
    fontSize: 35,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

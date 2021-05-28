import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 50,
    height: '70vh',
    width: 500,
    margin: '20px auto',
    display: 'flex',
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
  authBody: {
    background: '#EFE5C3',
    display: 'inline-flex',
    width: '100vw',
    height: '100vh',
    margin: 'auto',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPaper: {
    background: 'linear-gradient(to bottom right, #EFFCD5, #FFFCE5)',
  },
  registerPaper: {
    background: 'linear-gradient(to bottom right, #F4D9B0, #FFFCE5)',
  },
}))

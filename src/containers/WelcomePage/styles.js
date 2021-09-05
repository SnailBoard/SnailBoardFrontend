import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#E5E5E5',
    width: '100vw',
    height: '100vh',
    spacing: 0,
    justify: 'space-around',
  },
  welcomePaper: {
    backgroundColor: '#EFE5C3',
    padding: theme.spacing(5),
    marginRight: '4%',
  },
  paper: {
    backgroundColor: '#E5E5E5',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  img: {
    width: '800px',
    height: '260px',
    mixBlendMode: 'multiply',
    marginLeft: '22%',
    marginTop: 0,
  },
  phantom: {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  },
  footer: {
    textAlign: 'center',
    position: 'fixed',
    left: '0',
    bottom: '0',
    height: '5%',
    width: '100%',
  },
  coworkers: {
    width: '600px',
    height: '350px',
    mixBlendMode: 'multiply',
  },
}))

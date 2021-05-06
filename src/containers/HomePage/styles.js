import { makeStyles } from '@material-ui/core'
import { ACCENT2_COLOR, ACCENT_COLOR } from '../../core/values/colors'

export const useStyles = makeStyles(() => ({
  cardGrid: {},
  cardContainer: {
    marginTop: '15vh',
  },
  card: {
    minWidth: 200,
    background: ACCENT_COLOR,
  },
  header: {
    textAlign: 'center',
  },
  headerColumn: {
    paddingTop: '2vh',
    paddingLeft: '2vh',
  },
  itemCountColumn: {
    paddingBottom: '2vh',
    paddingLeft: '2vh',
  },
  pos: {
    marginBottom: 12,
    textAlign: 'center',
  },
  cardColumn: {
    padding: '2vh',
  },
  cardPaper: {
    background: ACCENT2_COLOR,
  },
  addBtn: {
    padding: '1vh',
    textAlign: 'center',
  },
  paperBtn: {},
}))

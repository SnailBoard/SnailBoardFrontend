import { makeStyles } from '@material-ui/core'
import {
  ACCENT2_COLOR,
  ACCENT3_COLOR,
  ACCENT_COLOR,
} from '../../../core/values/colors'

export const useStyles = makeStyles(() => ({
  card: {
    minWidth: 200,
    background: ACCENT_COLOR,
  },
  header: {
    textAlign: 'center',
  },
  headerColumn: {
    paddingTop: '20px',
    paddingLeft: '20px',
  },
  itemCountColumn: {
    paddingBottom: '20px',
    paddingLeft: '20px',
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
  addMemberBtn: {
    height: '100%',
    background: ACCENT3_COLOR,
  },
  addMemberLabel: {
    textAlign: 'center',
  },
  addMemberPaper: {},
  paperBtn: {},
  addModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: 50,
    height: '50vh',
    width: '70vh',
    margin: '20px auto',
  },
}))

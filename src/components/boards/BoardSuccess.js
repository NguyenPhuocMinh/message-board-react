// redux store
import { useSelector, useDispatch } from 'react-redux';
// actions
import { redirectActions } from '../../actions';
// router dom
import { Link, useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    border: '1px solid black',
  },
  title: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const BoardSuccess = props => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { message } = useSelector(state => {
    return {
      message: state.messageReducer.message
    }
  });

  const handleClick = (event) => {
    dispatch(redirectActions.redirectBackList(history));
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.title}>
        <Typography variant="h4" gutterBottom>Đăng ký thành công</Typography>
      </div>
      <Divider style={{ width: '100%' }} />
      <br />
      <div className={classes.container}>
        <div className={classes.form}>
          <Typography variant="h5">
            {message}
          </Typography>
          <br />
          <Link to='/board-list' onClick={handleClick}>Quay lại danh sách</Link>
        </div>
      </div>
    </Container>
  )
};

export default BoardSuccess;
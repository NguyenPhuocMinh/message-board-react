import React, { useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { boardActions, redirectActions } from '../../actions'
// router dom
import { useHistory } from 'react-router-dom';
// core material
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
// fields
import {
  TextField,
  DateField
} from '../../common/fields';
// lodash
import { isEmpty } from 'lodash';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    border: '1px solid black'
  },
  title: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    margin: theme.spacing(12)
  },
  textFieldMulti: {
    maxWidth: '600px',
    textAlign: 'justify',
  },
  buttonForm: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-around'
  },
  submit: {
    width: 'auto',
    minWidth: '200px'
  }
}));

const BoardConfirm = props => {

  // state
  const [open, setOpen] = useState();

  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  const { data, messageInfo } = useSelector(state => {
    return {
      data: state.redirectReducer.data,
      messageInfo: state.messageReducer
    }
  });

  const handleSubmit = () => {
    dispatch(boardActions.createBoard(data, history))
    setOpen(true);
  }

  const handleClose = () => {
    dispatch(redirectActions.redirectBackCreate(data, history));
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.title}>
        <Typography variant="h4" gutterBottom>Confirm</Typography>
      </div>
      <Divider style={{ width: '100%' }} />
      <br />
      <div className={classes.container}>
        <div className={classes.form}>
          <div className={classes.formField}>
            <DateField
              label="Ngày đăng ký"
              source="registerDate"
              locales="en-ZA"
              record={data}
              className={classes.textField}
            />
          </div>
          <br />
          <div className={classes.formField}>
            <TextField
              label="Tiêu đề"
              source="title"
              record={data}
              className={classes.textFieldMulti}
            />
          </div>
          <br />
          <div className={classes.formField}>
            <TextField
              label="Tên"
              source="name"
              record={data}
              className={classes.textField}
            />
          </div>
          <br />
          <div className={classes.formField}>
            <TextField
              label="Nội dung"
              source="description"
              record={data}
              className={classes.textFieldMulti}
            />
          </div>
        </div>
        <div className={classes.buttonForm}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={classes.submit}
          >
            Đăng ký
            </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleClose}
            className={classes.submit}
          >
            Quay lại
          </Button>
        </div>
      </div>
      {!isEmpty(messageInfo) ?
        (
          <Snackbar
            open={open}
            message={messageInfo.message}
            onClose={() => setOpen(false)}
            TransitionComponent={TransitionUp}
            autoHideDuration={3000}
          />
        ) : null
      }
    </Container>
  )
};

export default BoardConfirm;
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { redirectActions } from '../../actions';
// router dom
import { useHistory } from 'react-router-dom';
// material ui core
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// form
import { Formik, Form, } from 'formik';
import { TextInput, DateInput } from '../../common/inputs';
// validate
import { validateBoard } from '../../validation';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(2),
    border: '1px solid black'
  },
  textInput: {
    width: 'auto',
    minWidth: '500px'
  },
  formInput: {
    display: 'flex',
    justifyContent: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: 'auto',
    minWidth: '200px'
  },
}));

const BoardCreate = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleRedirect = (values) => {
    dispatch(redirectActions.redirectConfirmPage(values, history));
  };

  const { data } = useSelector(state => {
    return {
      data: state.redirectReducer.data
    }
  })

  const initialValues = useMemo(() => {
    return {
      registerDate: data.registerDate,
      title: data.title,
      name: data.name,
      text: data.text
    }
  }, [])

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.title}>
        <Typography variant="h4" gutterBottom>Tạo bảng tin</Typography>
      </div>
      <Divider style={{ width: '100%' }} />
      <br />
      <div className={classes.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleRedirect(values)}
          validationSchema={validateBoard()}
        >
          {(formProps) => {
            const { handleSubmit } = formProps;
            return (
              <Form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.formInput}>
                  <DateInput
                    labelText='Ngày đăng ký'
                    name='registerDate'
                    isRequired
                    className={classes.textInput}
                    {...formProps}
                  />
                </div>
                <br />
                <div className={classes.formInput}>
                  <TextInput
                    labelText='Tiêu đề'
                    variant="outlined"
                    isRequired
                    id='title'
                    name='title'
                    className={classes.textInput}
                    {...formProps}
                  />
                </div>
                <br />
                <div className={classes.formInput}>
                  <TextInput
                    labelText='Tên'
                    variant="outlined"
                    isRequired
                    id='name'
                    name='name'
                    className={classes.textInput}
                    {...formProps}
                  />
                </div>
                <br />
                <div className={classes.formInput}>
                  <TextInput
                    labelText='Nội dung'
                    multiline
                    isRequired
                    rows={10}
                    name='text'
                    variant="outlined"
                    className={classes.textInput}
                    {...formProps}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Lưu nội dung
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default BoardCreate;
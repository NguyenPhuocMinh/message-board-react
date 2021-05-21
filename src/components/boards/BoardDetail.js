/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// moment
import moment from 'moment';
// redux
import { useSelector, useDispatch } from 'react-redux';
// actions
import {
  boardActions,
  redirectActions,
  dataBoardActions
} from '../../actions';
// router dom
import { useHistory, Link } from 'react-router-dom';
// core material
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty, find, get } from 'lodash';

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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  widthDisplay: {
    width: '100%',
    display: 'flex'
  },
  width50AlignCenter: {
    width: '50%',
    textAlign: 'center'
  },
  width100AlignCenter: {
    width: '100%',
    textAlign: 'center'
  },
  widthDisplayLink: {
    width: '100%',
    display: 'flex',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2)
  },
  width60Align: {
    width: '60%',
    textAlign: 'justify'
  },
  width50Max: {
    width: '50%',
    maxWidth: '300px'
  },
  width100: { width: '100%' },
  width60: { width: '60%' },
  width50: { width: '50%' },
  width20: { width: '20%' },
}));

const BoardDetail = props => {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // state
  const [currentId, setCurrentId] = useState('');
  const [hiddenPrevious, setHiddenPrevious] = useState(false);
  const [hiddenNext, setHiddenNext] = useState(false);

  useEffect(() => {
    dispatch(dataBoardActions.getAllBoards())
  }, [])

  const { record, data } = useSelector(state => {
    return {
      record: get(state, 'boardReducer.record.data'),
      data: get(state,'dataBoardReducer.data')
    }
  });

  useEffect(() => {
    if (!isEmpty(record)) {
      setCurrentId(record.id);
      const currentIndex = data && get(find(data, item => item.id === record.id), 'index');
      const lastIndex = data && get(data[data.length - 1], 'index');

      if (currentIndex === 0 && lastIndex === 0) {
        setHiddenPrevious(true);
        setHiddenNext(true);
      } else {
        if (currentIndex === 0) {
          setHiddenPrevious(true);
          setHiddenNext(false);
        } else {
          setHiddenPrevious(false);
          if (currentIndex === lastIndex) {
            setHiddenNext(true);
          } else {
            setHiddenNext(false);
          }
        }
      }
    }
  }, [record, data, setHiddenNext, setHiddenPrevious])

  const handleBackList = () => {
    dispatch(redirectActions.redirectBackList(history));
  }

  const registerDate = record && moment(record.registerDate).format('yyyy.MM.DD');
  const title = record && record.title;
  const name = record && record.name;
  const description = record && record.description;

  const handleNextDetail = (idCurrent) => {
    // find current data
    const currentData = find(data, item => item.id === idCurrent);
    const currentIndex = get(currentData, 'index');
    // find prevData
    const nextData = find(data, item => item.index === currentIndex + 1);
    const idNext = get(nextData, 'id');

    return dispatch(boardActions.getBoardNextId(idNext, history));
  };

  const handlePreviousDetail = (idCurrent) => {
    // find current data
    const currentData = find(data, item => item.id === idCurrent);
    const currentIndex = get(currentData, 'index');
    // find prevData
    const prevData = find(data, item => item.index === currentIndex - 1);
    const idPrev = get(prevData, 'id');

    return dispatch(boardActions.getBoardPrevId(idPrev, history));
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.title}>
        <Typography variant="h4" gutterBottom>Chi tiết bảng tin</Typography>
      </div>
      <Divider style={{ width: '100%' }} />
      <br />
      <div className={classes.container}>
        <div className={classes.form}>
          <div className={classes.widthDisplay}>
            <div className={classes.width50AlignCenter}>
              <Typography variant="subtitle1" gutterBottom>
                {registerDate}
              </Typography>
            </div>
            <div className={classes.width50Max}>
              <Typography variant="subtitle1" gutterBottom>
                {title}
              </Typography>
            </div>
          </div>
          <br />
          <div className={classes.widthDisplay}>
            <div className={classes.width20}>
            </div>
            <div className={classes.width60Align}>
              <Typography variant="subtitle1" gutterBottom>
                {name}
              </Typography>
            </div>
          </div>
          <br />
          <div className={classes.widthDisplay}>
            <div className={classes.width20}>
              <Typography variant="subtitle1" gutterBottom>
              </Typography>
            </div>
            <div className={classes.width60Align}>
              <Typography variant="subtitle1" gutterBottom>
                {description}
              </Typography>
            </div>
          </div>
          <br />
          <div className={classes.widthDisplayLink}>
            <div className={classes.width50AlignCenter}>
              {!hiddenPrevious ?
                (
                  <Link onClick={() => handlePreviousDetail(currentId)}>
                    Detail trước
                  </Link>
                ) : null
              }
            </div>
            <div className={classes.width50AlignCenter}>
              {!hiddenNext ?
                (
                  <Link onClick={() => handleNextDetail(currentId)}>
                    Detail tiếp theo
                  </Link>
                ) : null
              }
            </div>
          </div>
          <br />
          <div className={classes.width100AlignCenter}>
            <Link to="/board-list" onClick={handleBackList}>
              Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
};

export default BoardDetail;
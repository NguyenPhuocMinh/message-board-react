/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// moment
import moment from 'moment';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { boardActions, redirectActions } from '../../actions';
// router dom
import { useHistory, Link } from 'react-router-dom';
// core material
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

import { isEmpty } from 'lodash';

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
    border: '1px solid black',
    minHeight: '600px'
  },
  subTitle: {
    padding: '10px 0px 0px 35px',
    fontWeight: 'bold'
  },
  table: {
    padding: '0px 20px 20px 20px',
    minWidth: '750px',
  },
  tableCellRoot: {
    borderBottom: 'none',
    padding: '13px'
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
  tableCellBorder: {
    borderBottom: '1px solid black'
  }
}));

const BoardList = props => {

  // state
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRedirectPageCreate = (event) => {
    dispatch(redirectActions.redirectPageCreate(history));
  }

  const handleChangePage = (event, _page) => {
    setPage(_page);
  }

  const handleChangePerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  useEffect(() => {
    dispatch(boardActions.getBoardsPagination(page * perPage, page * perPage + perPage));
  }, [page, perPage]);

  const { boards, total } = useSelector(state => {
    return {
      boards: state.boardReducer.boards,
      total: state.boardReducer.totalBoards
    }
  });

  const handleClickDetail = (id) => {
    dispatch(boardActions.getBoardById(id));
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.title}>
        <Typography variant="h4" gutterBottom>Danh sách bảng tin</Typography>
      </div>
      <Divider style={{ width: '100%' }} />
      <br />
      <Button
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleRedirectPageCreate}
      >
        Đăng ký sự kiện
      </Button>
      {isEmpty(boards) ? (
        <div>
          <Typography
            variant="subtitle1"
            className={classes.subTitle}
          >
            Chưa có bảng tin nào. Vui lòng tạo mới
        </Typography>
        </div>
      ) : (
          <div className={classes.container}>
            <Typography
              variant="subtitle1"
              className={classes.subTitle}
            >
              Bảng thông báo
        </Typography>
            <TableContainer>
              <div className={classes.table}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableCellBorder} align="left">Ngày đăng ký</TableCell>
                      <TableCell className={classes.tableCellBorder} align="left">Tiêu đề</TableCell>
                      <TableCell className={classes.tableCellBorder} align="left">Tên</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {boards && boards.map((board) => {
                      const registerDate = board.registerDate;
                      const dateMoment = moment(registerDate).format('yyyy.MM.DD');
                      return (
                        <TableRow key={board.id}>
                          <TableCell align="left" className={classes.tableCellRoot}>
                            {dateMoment}
                          </TableCell>
                          <TableCell align="left" className={classes.tableCellRoot}>
                            <Link
                              to={`/board-detail/${board.id}`}
                              onClick={() => handleClickDetail(board.id)}
                            >
                              {board.title}
                            </Link>
                          </TableCell>
                          <TableCell align="left" className={classes.tableCellRoot}>{board.name}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
                <TablePagination
                  component="span"
                  count={total || 0}
                  rowsPerPage={perPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangePerPage}
                  style={{ minHeight: '100px' }}
                />
              </div>
            </TableContainer>
          </div>
        )
      }

    </Container>
  )
};

export default BoardList;
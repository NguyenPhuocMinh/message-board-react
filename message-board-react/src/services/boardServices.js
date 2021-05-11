import { http } from '../helpers';
import { isEmpty } from 'lodash';

const create = (values) => {
  return http.post('/boards', values)
    .then(response => {
      const { data, status } = response;
      return { data, status };
    })
    .catch(error => {
      if (!isEmpty(error.response)) {
        const { data, status } = error.response;
        return {
          status: status,
          message: data.message
        };
      }
    });
};

const getAllPagination = (_start, _end) => {
  return http.get('/boards', {
    params: { _start, _end }
  })
    .then(({ data }) => ({ data: data.result, total: data.total }))
};

const getAll = () => {
  return http.get('/boards')
    .then(({ data }) => ({ data: data.result }))
}

const getById = (id) => {
  return http.get(`/boards/${id}`)
}

const boardService = {
  create,
  getAllPagination,
  getAll,
  getById
};

export default boardService;
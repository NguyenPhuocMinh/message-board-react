import * as Yup from 'yup';
import { parse, isDate } from "date-fns";

const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy/MM/dd", new Date());

  return parsedDate;
}

const validateBoard = () => {
  return Yup.object().shape({
    registerDate: Yup.date().required('Bắt buộc nhập').transform(parseDateString),
    title: Yup.string().required('Bắt buộc nhập').max(100, 'Vui lòng nhập dưới 100 ký tự'),
    name: Yup.string().required('Bắt buộc nhập').max(50, 'Vui lòng nhập dưới 50 ký tự'),
    description: Yup.string().required('Bắt buộc nhập').max(1000, 'Vui lòng nhập dưới 1000 ký tự'),
  })
}

export default validateBoard;
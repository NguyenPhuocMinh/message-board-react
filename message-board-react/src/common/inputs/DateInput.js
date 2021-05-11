import React from 'react';
import { Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  labelText: {
    display: 'inline-flex',
    width: 'auto',
    minWidth: '105px'
  },
  field: {
    display: 'inline-flex',
    marginLeft: '10px',
    marginRight: '10px'
  },
  fontLabel: {
    fontSize: '1rem'
  },
})

const DateInput = props => {
  const {
    labelText,
    values,
    name,
    isRequired,
    className,
    formClassName
  } = props;

  const classes = useStyles();

  return (
    <div className={formClassName}>
      <div className={classes.labelText}>
        <Typography className={classes.fontLabel}>
          {labelText} {isRequired ? '*' : null}
        </Typography>
      </div>
      <div className={classes.field}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            inputVariant="outlined"
            format="yyyy/MM/dd"
            value={values[name]}
            onChange={(value) => props.setFieldValue(name, value)}
            className={className}
            required={isRequired}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  )
};

export default DateInput;
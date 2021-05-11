import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { get } from 'lodash';

const useStyles = makeStyles({
  label: {
    display: 'inline-flex',
    width: 'auto',
    minWidth: '120px'
  },
  field: {
    display: 'inline-flex',
    marginLeft: '10px',
    marginRight: '10px'
  },
  fontLabel: {
    fontSize: '1rem',
  },
})

const toLocaleStringSupportsLocales = (() => {
  try {
    new Date().toLocaleString('i');
  } catch (error) {
    return error instanceof RangeError;
  }
  return false;
})();

const DateField = props => {
  const {
    label,
    record,
    source,
    locales,
    options,
    className,
    formClassName,
  } = props;

  const classes = useStyles();

  const value = get(record, source);

  const date = value instanceof Date ? value : new Date(value);
  const dateString = toLocaleStringSupportsLocales
    ? date.toLocaleDateString(locales, options)
    : date.toLocaleDateString();

  return (
    <div className={formClassName}>
      <div className={classes.label}>
        <Typography className={classes.fontLabel}>
          {label}
        </Typography>
      </div>
      <div className={classes.field}>
        <Typography
          variant="subtitle1"
          className={className}
        >
          {dateString}
        </Typography>
      </div>
    </div>
  );
};

export default React.memo(DateField);
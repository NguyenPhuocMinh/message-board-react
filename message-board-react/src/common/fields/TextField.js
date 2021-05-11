import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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

const TextField = props => {
  const {
    record,
    source,
    emptyText,
    formClassName,
    className,
    label
  } = props;

  const classes = useStyles();

  const value = get(record, source);

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
          {value != null && typeof value !== 'string'
            ? JSON.stringify(value)
            : value || emptyText}
        </Typography>
      </div>
    </div>
  );
};

export default React.memo(TextField);
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  label: {
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
    fontSize: '1rem',
  },
}));

const TextInput = props => {
  const {
    labelText,
    name,
    values,
    type,
    variant,
    handleChange,
    handleBlur,
    errors,
    touched,
    isRequired,
    multiline,
    rows,
    className,
    formClassName,
  } = props;

  const classes = useStyles();

  return (
    <div className={formClassName}>
      <div className={classes.label}>
        <Typography className={classes.fontLabel}>
          {labelText} {isRequired ? '*' : null}
        </Typography>
      </div>
      <div className={classes.field}>
        <TextField
          label=""
          variant={variant}
          type={type}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[name]}
          required={isRequired}
          error={errors[name] && touched[name]}
          helperText={(errors[name] && touched[name]) && errors[name]}
          multiline={multiline}
          rows={rows}
          className={className}
          InputProps={{
            autoComplete: 'off',
            classes: {
              root: classes.root,
              input: classes.input
            }
          }}
        />
      </div>
    </div>
  )
};

export default TextInput;
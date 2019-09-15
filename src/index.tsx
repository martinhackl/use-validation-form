import { useState, useMemo, useEffect, ChangeEvent, FormEvent } from 'react';

type Validator = (value: any) => string | false;

export interface Validators {
  [key: string]: Validator;
}

export interface DefaultValues {
  [key: string]: any;
}

interface Errors {
  [key: string]: string;
}

interface Arguments {
  defaultValues: DefaultValues;
  validators?: Validators;
  callback?: () => void;
}

export function useValidationForm({
  defaultValues,
  validators,
  callback,
}: Arguments) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({} as Errors);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onChange = (e: ChangeEvent<any>) => {
    e.persist();
    const {
      target: { type, name, value },
    } = e;

    if (type === 'checkbox') {
      setValues(v => ({ ...v, [name]: !v[name] }));
    } else if (e.target.localName === 'select' && e.target.multiple) {
      console.log(e);
      let cur = [...e.target.options].filter(o => o.selected).map(o => o.value);
      setValues(v => ({ ...v, [name]: cur }));
    } else {
      setValues(v => ({ ...v, [name]: value }));
    }

    setIsDirty(true);

    const errMsg = validators && validators[name] && validators[name](value);
    if (errMsg) {
      setErrors(e => ({ ...e, [name]: errMsg }));
    } else {
      const { [name]: e, ...other } = errors;
      setErrors(other);
    }
  };

  const validateAll = () => {
    if (validators) {
      setErrors(
        Object.keys(validators).reduce((prev, next) => {
          const err = validators[next](values[next]);
          return err
            ? { ...prev, [next]: validators[next](values[next]) }
            : { ...prev };
        }, {})
      );
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAll();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      if (isValid && typeof callback === 'function') callback();
      setIsSubmitting(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    validateAll,
    onChange,
    onSubmit,
  };
}

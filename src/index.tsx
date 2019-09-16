/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, ChangeEvent, FormEvent } from 'react';

type Validator = (value: any) => string | false;

export interface Validators {
  [key: string]: Validator;
}

export interface Values {
  [key: string]: any;
}

interface Errors {
  [key: string]: string;
}

interface Arguments {
  defaultValues: Values;
  validators?: Validators;
  callback?: () => void;
}

interface ReturnObject {
  values: Values;
  errors: Errors;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  validateAll: () => void;
  onChange: (e: ChangeEvent<any>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function useValidationForm({
  defaultValues,
  validators,
  callback,
}: Arguments): ReturnObject {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({} as Errors);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onChange = (e: ChangeEvent<any>): void => {
    e.persist();
    const {
      target: { type, name, value },
    } = e;

    if (type === 'checkbox') {
      setValues(v => ({ ...v, [name]: !v[name] }));
    } else if (e.target.localName === 'select' && e.target.multiple) {
      const cur = [...e.target.options]
        .filter(o => o.selected)
        .map(o => o.value);
      setValues(v => ({ ...v, [name]: cur }));
    } else {
      setValues(v => ({ ...v, [name]: value }));
    }

    setIsDirty(true);

    const errMsg = validators && validators[name] && validators[name](value);
    if (errMsg) {
      setErrors(e => ({ ...e, [name]: errMsg }));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [name]: _, ...other } = errors;
      setErrors(other);
    }
  };

  const validateAll = (): void => {
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

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
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

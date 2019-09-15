# use-validation-form

> React hook for form input handling and validation

[![NPM](https://img.shields.io/npm/v/use-validation-form.svg)](https://www.npmjs.com/package/use-validation-form)
[![Build Status](https://travis-ci.org/martinhackl/use-validation-form.svg?branch=master)](https://travis-ci.org/martinhackl/use-validation-form)
[![codecov](https://codecov.io/gh/martinhackl/use-validation-form/branch/master/graph/badge.svg)](https://codecov.io/gh/martinhackl/use-validation-form)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Rules](#rules)
  - [Supported Input Types](#supported-input-types)
- [API](#api)
- [Docs](#docs)
- [LICENSE](#license)

## Install

```bash
npm install --save use-validation-form
```

## Usage

```tsx
import * as React from 'react';

import { useValidationForm } from 'use-validation-form';

const MyForm = () => {
  const defaultValues = {
    myInput: '',
  };
  const validators = {
    myInput: v => v < 3 && 'Input must be greater than 2 characters!',
  };

  const { values, errors, onChange, onSubmit} = useValidationForm({
    defaultValues,
    validators,
    callback: () => { alert('onSubmit called!'); },
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="myInput" value={values.myInput} onChange={onChange}>
      {errors.myInput && <span>{errors.myInput}</span>}

      <button type="submit">Submit</button>
    </form>
  )
};
```

### Rules

- The input must have a defaultValue.
- The input must have a name which is identical to the corresponding key in `defaultValues` and `validators`.
- The input must have a connected `value` and `onChange` prop.

### Supported Input Types:

#### Input

```tsx
<input type="text" name="myInput" value={values.myInput} onChange={onChange} />
```

#### Textarea

```tsx
<textarea name="myTextarea" value={values.myTextarea} onChange={onChange} />
```

#### Checkbox

```tsx
// Use checked instead of value
// defaultValue must be boolean
<input
  type="checkbox"
  name="myCheckbox"
  checked={values.myCheckbox}
  onChange={onChange}
/>
```

#### Select

```tsx
<select name="mySelect" value={values.mySelect} onChange={onChange}>
  <option value="one">One</option>
  <option value="two">Two</option>
  <option value="three">Three</option>
</select>
```

#### Multiple Select

```tsx
// defaultValue must be an array
<select
  multiple
  size="3"
  name="myMultipleSelect"
  value={values.myMultipleSelect}
  onChange={onChange}
>
  <option value="one">One</option>
  <option value="two">Two</option>
  <option value="three">Three</option>
</select>
```

#### Radio

```tsx
// To treat multiple radio buttons as one group each must have the same name
<div>
  <label className="radio">
    <input
      type="radio"
      name="myRadio"
      checked={values.myRadio === 'foo'}
      value="foo"
      onChange={onChange}
    />
    Foo
  </label>
  <label className="radio">
    <input
      type="radio"
      name="myRadio"
      checked={values.myRadio === 'bar'}
      value="bar"
      onChange={onChange}
    />
    Bar
  </label>
</div>
```

## API

```tsx
const {
  values,
  errors,
  isValid,
  isDirty,
  isSubmitting,
  validateAll,
  onChange,
  onSubmit,
} = useValidationForm({
  defaultValues,
  validators,
  callback,
});
```

- **values** Object with current form values.
  Key is equal to the name of the input.
  Value is equal to the value of the input.
- **errors** Object with current thrown errors.
  Key is equal to the name of the input.
  Value is equal to the string defined in the `validators` object.
- **isValid** Boolean. Is true if there are no errors present.
- **isDirty** Boolean. Is true as soon as the user starts interacting with any controlled input.
- **isSubmitting** Boolean. True when submitting (After all inputs were validated). False after the callback was called.
- **validateAll** Function to validate all inputs at the same time.
- **onChange** onChange handler which should be passed to the input's onChange (onBlur, etc.) handler.
- **onSubmit** onSubmit handler which should be passed the the form's onSubmit handler.

```tsx
// Parameter object

type Validator = (value: any) => string | false;

export interface Validators {
  [key: string]: Validator;
}

export interface DefaultValues {
  [key: string]: any;
}

interface Arguments {
  defaultValues: DefaultValues;
  validators?: Validators;
  callback?: () => void;
}
```

## Docs

[**Read The Docs**](https://martinhackl.github.io/use-validation-form/)

## License

MIT

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

```

```

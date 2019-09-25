import React from 'react';
import { useValidationForm } from 'use-validation-form';
import { Form } from 'react-bootstrap';

import InputCard from '../components/input-card';

function Inputs() {
  const defaultValues = {
    myInput: '',
    myTextarea: '',
    myCheckbox: false,
    mySelect: 'one',
    myMultipleSelect: [],
    myRadio: '',
  };
  const validators = {
    myInput: v =>
      v.length <= 5 && 'myInput must be longer than five characters',
    myTextarea: v =>
      v.length > 50 && 'myTextarea must be shorter than 50 characters',
  };

  const { values, errors, onChange, onSubmit } = useValidationForm({
    defaultValues,
    validators,
    callback: () => {
      alert('onSubmit called!');
    },
  });

  return (
    <>
      <h2>Inputs</h2>
      <Form onSubmit={onSubmit}>
        <InputCard
          title="Text"
          label="MyInput"
          value={values.myInput}
          error={errors.myInput}
          control={() => (
            <Form.Control
              type="text"
              name="myInput"
              value={values.myInput}
              onChange={onChange}
              isInvalid={!!errors.myInput}
            />
          )}
          code={`
<input
  type="text"
  name="myInput"
  value={values.myInput}
  onChange={onChange}
/>
{!!errors.myInput && <span>{errors.myInput}</span>}
          `}
        />
        <InputCard
          title="Textarea"
          label="myTextarea"
          value={values.myTextarea}
          error={errors.myTextarea}
          control={() => (
            <Form.Control
              as="textarea"
              rows="3"
              name="myTextarea"
              value={values.myTextarea}
              onChange={onChange}
            />
          )}
          code={`
<textarea
  name="myTextarea"
  value={values.myTextarea}
  onChange={onChange}
/>
          `}
        />
        <InputCard
          title="Checkbox"
          label=""
          value={values.myCheckbox}
          error="undefined"
          control={() => (
            <Form.Check
              type="checkbox"
              label="myCheckbox"
              name="myCheckbox"
              checked={values.myCheckbox}
              onChange={onChange}
            />
          )}
          code={`
<input
  type="checkbox"
  name="mycheckbox"
  checked={values.mycheckbox}
  onChange={onChange}
/>
          `}
        />
        <InputCard
          title="Select"
          label="mySelect"
          value={values.mySelect}
          error="undefined"
          control={() => (
            <Form.Control
              as="select"
              name="mySelect"
              value={values.mySelect}
              onChange={onChange}
            >
              <option value="one">1</option>
              <option value="two">2</option>
              <option value="three">3</option>
            </Form.Control>
          )}
          code={`
<select
  name="mySelect"
  value={values.mySelect}
  onChange={onChange}
>
  <option value="one">One</option>
  <option value="two">Two</option>
  <option value="three">Three</option>
</select>
          `}
        />
        <InputCard
          title="Multiple Select"
          label="myMultipleSelect"
          value={values.myMultipleSelect}
          error="undefined"
          control={() => (
            <Form.Control
              as="select"
              multiple
              size="3"
              name="myMultipleSelect"
              value={values.myMultipleSelect}
              onChange={onChange}
            >
              <option value="one">1</option>
              <option value="two">2</option>
              <option value="three">3</option>
            </Form.Control>
          )}
          code={`
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
          `}
        />
        <InputCard
          title="Radio"
          label=""
          value={values.myRadio}
          error="undefined"
          control={() => (
            <>
              <Form.Check
                type="radio"
                label="Radio one"
                name="myRadio"
                value="radioOne"
                checked={values.myRadio === 'radioOne'}
                onChange={onChange}
              />

              <Form.Check
                type="radio"
                label="Radio two"
                name="myRadio"
                value="radioTwo"
                checked={values.myRadio === 'radioTwo'}
                onChange={onChange}
              />
            </>
          )}
          code={`
<input
  type="radio"
  name="myRadio"
  checked={values.myRadio === 'radioOne'}
  value="radioOne"
  onChange={onChange}
/>
<input
  type="radio"
  name="myRadio"
  checked={values.myRadio === 'radioTwo'}
  value="radioTwo"
  onChange={onChange}
/>
          `}
        />
      </Form>
    </>
  );
}

export default Inputs;

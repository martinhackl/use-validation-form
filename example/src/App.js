import React from 'react';
import { useValidationForm } from 'use-validation-form';

import Header from './components/Header';
import CodePreview from './components/CodePreview';

function App() {
  const defaultValues = {
    myinput: '',
    mytextarea: '',
    mycheckbox: true,
    myselect: 'one',
    mymultipleSelect: [],
    myradio: 'foo',
  };
  const validators = { username: e => e.length < 3 && 'username wrong' };

  const { values, errors, onChange, onSubmit } = useValidationForm({
    defaultValues,
    validators,
    callback: () => alert('Submit Form!'),
  });

  return (
    <div>
      <Header />
      <div className="container">
        <CodePreview
          renderInput={() => (
            <input
              className="input"
              type="text"
              placeholder="input"
              name="myinput"
              value={values.myinput}
              onChange={onChange}
            />
          )}
          title="Input"
          code={`<input type="text" name="myinput" value={values.myinput} onChange={onChange} />`}
          value={values.myinput}
        />
        <CodePreview
          renderInput={() => (
            <textarea
              className="textarea"
              name="mytextarea"
              value={values.mytextarea}
              onChange={onChange}
            />
          )}
          title="Textarea"
          code={`<textarea name="mytextarea" value={values.mytextarea} onChange={onChange} />`}
          value={values.mytextarea}
        />
        <CodePreview
          renderInput={() => (
            <label className="checkbox">
              <input
                type="checkbox"
                name="mycheckbox"
                checked={values.mycheckbox}
                onChange={onChange}
              />
              my checkbox
            </label>
          )}
          title="Checkbox"
          code={`<input type="checkbox" name="mycheckbox" checked={values.mycheckbox} onChange={onChange} />`}
          value={values.mycheckbox}
        />
        <CodePreview
          renderInput={() => (
            <div className="select">
              <select
                name="myselect"
                value={values.myselect}
                onChange={onChange}
              >
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="three">Three</option>
              </select>
            </div>
          )}
          title="Select"
          code={`
<select name="myselect" value={values.myselect} onChange={onChange}>
  <option value="one">One</option>
  <option value="two">Two</option>
  <option value="three">Three</option>
</select>
          `}
          value={values.myselect}
        />
      </div>
      <CodePreview
        renderInput={() => (
          <div className="select is-multiple">
            <select
              multiple
              size="3"
              name="mymultipleSelect"
              value={values.mymultipleSelect}
              onChange={onChange}
            >
              <option value="one">One</option>
              <option value="two">Two</option>
              <option value="three">Three</option>
            </select>
          </div>
        )}
        title="Multiple Select"
        code={`
<select multiple size="3" name="mymultipleSelect" values={values.mymultipleSelect} onChange={onChange}>
  <option value="one">One</option>
  <option value="two">Two</option>
  <option value="three">Three</option>
</select>
        `}
        value={values.mymultipleSelect}
      />
      <CodePreview
        renderInput={() => (
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="myradio"
                checked={values.myradio === 'foo'}
                value="foo"
                onChange={onChange}
              />
              Foo
            </label>
            <label className="radio">
              <input
                type="radio"
                name="myradio"
                checked={values.myradio === 'bar'}
                value="bar"
                onChange={onChange}
              />
              Bar
            </label>
          </div>
        )}
        title="Radio"
        code={`
<input type="radio" name="myradio" checked={values.myradio === 'foo'} value="foo" onChange={onChange} />
<input type="radio" name="myradio" checked={values.myradio === 'bar'} value="bar" onChange={onChange} />
        `}
        value={values.myradio}
      />
    </div>
  );
}

export default App;

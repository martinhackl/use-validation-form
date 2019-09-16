/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, fireEvent, wait } from '@testing-library/react';
import selectEvent from 'react-select-event';

import { useValidationForm, Validators, DefaultValues } from '.';

describe('Init', () => {
  test('validators and callback should be optional', () => {
    const defaultValues = { username: 'foobar' };
    expect(
      renderHook(() => useValidationForm({ defaultValues }))
    ).toBeDefined();
  });

  test('defaultValues should prefill values', () => {
    const defaultValues = { username: 'foobar' };
    const { result } = renderHook(() => useValidationForm({ defaultValues }));

    expect(Object.keys(result.current.values).length).toBe(1);
    expect(result.current.values['username']).toBe('foobar');
  });

  test('initially errors should be empty', () => {
    const defaultValues = { username: 'foobar' };
    const { result } = renderHook(() => useValidationForm({ defaultValues }));

    expect(Object.keys(result.current.errors).length).toBe(0);
  });

  test('initially isValid should be true', () => {
    const defaultValues = { username: 'foobar' };
    const { result } = renderHook(() => useValidationForm({ defaultValues }));

    expect(result.current.isValid).toBe(true);
  });
});

describe('validateAll', () => {
  test('validateAll should correctly validate wrong value', () => {
    const defaultValues: DefaultValues = { username: 'foobar' };
    const validators: Validators = {
      username: e => e.length < 7 && 'my username error',
    };
    const { result } = renderHook(() =>
      useValidationForm({ defaultValues, validators })
    );

    act(() => result.current.validateAll());

    expect(Object.keys(result.current.errors).length).toBe(1);
    expect(result.current.errors['username']).toBe('my username error');
  });

  test('validateAll should correctly validate correct value', () => {
    const defaultValues: DefaultValues = { username: 'foobar' };
    const validators: Validators = {
      username: e => e.length < 3 && 'my username error',
    };
    const { result } = renderHook(() =>
      useValidationForm({ defaultValues, validators })
    );

    act(() => result.current.validateAll());

    expect(Object.keys(result.current.errors).length).toBe(0);
  });

  test('validateAll should correctly validate multiple incorrect values', () => {
    const defaultValues: DefaultValues = {
      username: 'foobar',
      password: '123',
    };
    const validators: Validators = {
      username: e => e.length < 10 && 'my username error',
      password: e => e.length < 8 && 'my password error',
    };
    const { result } = renderHook(() =>
      useValidationForm({ defaultValues, validators })
    );

    act(() => result.current.validateAll());

    expect(Object.keys(result.current.errors).length).toBe(2);
    expect(result.current.errors['username']).toBe('my username error');
    expect(result.current.errors['password']).toBe('my password error');
  });

  test('validateAll should correctly validate multiple correct values', () => {
    const defaultValues: DefaultValues = {
      username: 'foobar',
      password: '123',
    };
    const validators: Validators = {
      username: e => e.length < 6 && 'my username error',
      password: e => e.length < 3 && 'my password error',
    };
    const { result } = renderHook(() =>
      useValidationForm({ defaultValues, validators })
    );

    act(() => result.current.validateAll());

    expect(Object.keys(result.current.errors).length).toBe(0);
  });

  test('validateAll should correctly validate multiple correct and incorrect values', () => {
    const defaultValues: DefaultValues = {
      username: 'foobar',
      password: '123',
    };
    const validators: Validators = {
      username: e => e.length < 10 && 'my username error',
      password: e => e.length < 3 && 'my password error',
    };
    const { result } = renderHook(() =>
      useValidationForm({ defaultValues, validators })
    );

    act(() => result.current.validateAll());

    expect(Object.keys(result.current.errors).length).toBe(1);
    expect(result.current.errors['username']).toBe('my username error');
  });
});

describe('onChange', () => {
  test('calling onChange should change internal value', () => {
    const defaultValues: DefaultValues = { username: 'foobar' };
    const { result } = renderHook(() => useValidationForm({ defaultValues }));

    const { container } = render(
      <input
        type="text"
        name="username"
        value={result.current.values.username}
        onChange={result.current.onChange}
      />
    );
    const input = container.querySelector('input')!;

    act(() => {
      fireEvent.change(input, { target: { value: 'foo' } });
    });

    expect(result.current.values.username).toBe('foo');
  });

  test("calling onChange should change input's value", async () => {
    const defaultValues: DefaultValues = { username: 'foobar' };
    const { result } = renderHook(() => useValidationForm({ defaultValues }));

    const { container } = render(
      <input
        data-testid="input"
        type="text"
        name="username"
        value={result.current.values.username}
        onChange={result.current.onChange}
      />
    );
    const input = container.querySelector('input')!;

    act(() => {
      fireEvent.change(input, { target: { value: 'foonew' } });
    });

    wait(() => {
      expect(input.value).toBe('foonew');
    });
  });

  test('calling onchange should set error on invalid input', () => {
    const defaultValues: DefaultValues = { username: 'foobar' };
    const validators: Validators = { username: e => e.length < 3 && 'error' };
    const { result } = renderHook(() =>
      useValidationForm({ defaultValues, validators })
    );

    const { container } = render(
      <input
        type="text"
        name="username"
        value={result.current.values.username}
        onChange={result.current.onChange}
      />
    );
    const input = container.querySelector('input')!;

    act(() => {
      fireEvent.change(input, { target: { value: 'f' } });
    });

    wait(() => {
      expect(input.value).toBe('f');
      expect(Object.keys(result.current.errors).length).toBe(1);
      expect(result.current.errors.username).toBe('error');
    });
  });

  test('calling onchange with checkbox should invert value', () => {
    const defaultValues: DefaultValues = { mycheckbox: false };
    const { result } = renderHook(() => useValidationForm({ defaultValues }));

    const { container } = render(
      <input
        type="checkbox"
        name="mycheckbox"
        checked={result.current.values.mycheckbox}
        onChange={result.current.onChange}
      />
    );
    const input = container.querySelector('input')!;

    expect(input.checked).toBe(false);

    act(() => {
      fireEvent.click(input);
    });

    wait(() => {
      expect(input.checked).toBe(true);
    });
  });

  test('calling onchange with multiple select should change array value', () => {
    const defaultValues: DefaultValues = { multipleSelect: [] };
    const { result } = renderHook(() => useValidationForm({ defaultValues }));

    const { container } = render(
      <select
        name="multipleSelect"
        value={result.current.values.multipleSelect}
        onChange={result.current.onChange}
        multiple
      >
        <option value="optonevalue">optone</option>
        <option value="opttwovalue">opttwo</option>
      </select>
    );
    const select = container.querySelector('select')!;

    expect(select.multiple).toBe(true);

    act(() => {
      selectEvent.select(select, ['optonevalue']);
    });

    wait(() => {
      expect(result.current.values.multipleSelect.length).toBe(1);
    });

    act(() => {
      selectEvent.select(select, ['opttwovalue']);
    });

    wait(() => {
      expect(result.current.values.multipleSelect.length).toBe(2);
    });
  });
});

describe('onSubmit', () => {
  test('onSubmit should validate all inputs before submitting', () => {
    const defaultValues: DefaultValues = { username: 'foobar' };
    const validators: Validators = { username: e => e.length < 7 && 'error' };
    const { result } = renderHook(() =>
      useValidationForm({ defaultValues, validators })
    );

    const { container } = render(
      <form onSubmit={result.current.onSubmit}>
        <input
          type="text"
          name="username"
          value={result.current.values.username}
          onChange={result.current.onChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
    const button = container.querySelector('button')!;

    expect(Object.keys(result.current.errors).length).toBe(0);

    act(() => {
      fireEvent.click(button);
    });

    expect(Object.keys(result.current.errors).length).toBe(1);
    expect(result.current.errors.username).toBe('error');
  });

  test('onSubmit should call callback', () => {
    const defaultValues: DefaultValues = { username: 'foobar' };
    const mockCallback = jest.fn(() => 42);
    const { result } = renderHook(() =>
      useValidationForm({ defaultValues, callback: mockCallback })
    );

    const { container } = render(
      <form onSubmit={result.current.onSubmit}>
        <input
          type="text"
          name="username"
          value={result.current.values.username}
          onChange={result.current.onChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
    const button = container.querySelector('button')!;

    expect(mockCallback.mock.calls.length).toBe(0);

    act(() => {
      fireEvent.click(button);
    });

    wait(() => {
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.results[0].value).toBe(42);
    });
  });
});

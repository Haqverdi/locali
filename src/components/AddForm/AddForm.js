import React from 'react';
import { Form, Input, Button } from 'antd';
// import PropTypes from 'prop-types';

function validate(values, setErrors) {
  let isFormValid = true;
  const errors = {};
  const keyReg = /^[A-Za-z]+$/;

  if (!keyReg.test(values.key)) {
    isFormValid = false;
    errors.key = 'error';
  }

  Object.keys(values).forEach(item => {
    const value = values[item];
    if (!value) {
      isFormValid = false;
      errors[item] = 'error';
    }
  });

  setErrors({ type: 'validate', errors });

  return isFormValid;
}

const initialState = {
  values: {
    key: '',
    az: '',
    en: '',
    ru: '',
  },
  errors: {},
};

function formReducer(state, action) {
  switch (action.type) {
    case 'onInputChange':
      return {
        values: {
          ...state.values,
          [action.name]: action.value,
        },
        errors: {
          ...state.errors,
          [action.name]: '',
        },
      };
    case 'validate':
      return {
        ...state,
        errors: action.errors,
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function AddForm({ handleSubmit }) {
  const [{ values, errors }, setState] = React.useReducer(formReducer, initialState);

  const { key, az, en, ru } = values;

  const firstInputRef = React.useRef(null);

  function handleChange(e) {
    e.persist();
    setState({ type: 'onInputChange', name: e.target.name, value: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (validate(values, setState)) {
      handleSubmit(values);
      firstInputRef.current.focus();
      setState({ type: 'reset' });
    }
  }

  return (
    <Form layout="inline" onSubmit={onSubmit}>
      <Form.Item label="key" validateStatus={errors.key}>
        <Input autoFocus allowClear name="key" value={key} onChange={handleChange} ref={firstInputRef} />
      </Form.Item>
      <Form.Item label="az" validateStatus={errors.az}>
        <Input allowClear name="az" value={az} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="en" validateStatus={errors.en}>
        <Input allowClear name="en" value={en} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="ru" validateStatus={errors.ru}>
        <Input allowClear name="ru" value={ru} onChange={handleChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon="plus">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

// AddForm.propTypes = {};

export default AddForm;

import React from 'react';

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const formRef = React.useRef(null);

  const handleChange = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(formRef.current.checkValidity());
  };

  const validateForm = () => {
    setIsValid(formRef.current.checkValidity());
  };

  const resetFrom = (newValues = {}, newErrors = {}) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(formRef.current.checkValidity());
  };

  const isValuesEqualsPrevious = (previousValues) => {
    if (!previousValues) {
      return false;
    }

    const keysNewValues = Object.keys(values);

    for (let key of keysNewValues) {
      if (values[key] !== previousValues[key]) {
        return false;
      }
    }
    return true;
  };

  return { values, setValues, handleChange, resetFrom, errors, isValid, isValuesEqualsPrevious, formRef, validateForm };
}

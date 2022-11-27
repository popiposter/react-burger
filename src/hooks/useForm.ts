import React, { ChangeEvent } from 'react';

interface IValues {
  [key: string]: string;
}

export function useFormWithValidation() {
  const [values, setValues] = React.useState<IValues>({});
  const [errors, setErrors] = React.useState<IValues>({});
  const [isValid, setIsValid] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    validateForm();
  };

  const validateForm = () => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  };

  const resetFrom = (newValues: IValues = {}, newErrors: IValues = {}) => {
    setValues(newValues);
    setErrors(newErrors);
    validateForm();
  };

  const isValuesEqualsPrevious = (previousValues: IValues) => {
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

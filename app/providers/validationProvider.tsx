import React, { createContext, useState, useContext, useEffect } from "react";

type ValidationRule<T> = (value: T) => string | null;

interface FieldValidationState<T> {
  rules: ValidationRule<T>[];
  error: string | null;
}

interface ValidationContextValue {
  registerField: <T>(name: string, rules: ValidationRule<T>[]) => void;
  validateField: <T>(name: string, value: T) => void;
  validateForm: () => boolean;
  getFieldState: (name: string) => FieldValidationState<unknown> | undefined;
}

export const ValidationContext = createContext<ValidationContextValue>({
  registerField: () => {},
  validateField: () => {},
  validateForm: () => false,
  getFieldState: () => undefined,
});

export const ValidationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [validationState, setValidationState] = useState<
    Record<string, FieldValidationState<unknown>>
  >({});

  const registerField = <T,>(name: string, rules: ValidationRule<T>[]) => {
    setValidationState((prevState) => {
      // Only add if the field doesn't already exist
      if (!prevState[name]) {
        return {
          ...prevState,
          [name]: { rules, error: null } as FieldValidationState<unknown>,
        };
      }
      return prevState;
    });
  };

  const validateField = <T,>(name: string, value: T) => {
    const fieldState = validationState[name];

    if (!fieldState) {
      console.warn(`Field ${name} has not been registered`);
      return;
    }

    const { rules } = fieldState;
    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        setValidationState((prevState) => ({
          ...prevState,
          [name]: { ...fieldState, error },
        }));
        return;
      }
    }

    setValidationState((prevState) => ({
      ...prevState,
      [name]: { ...fieldState, error: null },
    }));
  };

  const validateForm = () => {
    return Object.values(validationState).every((field) => !field.error);
  };

  const getFieldState = (name: string) => {
    return validationState[name];
  };

  return (
    <ValidationContext.Provider
      value={{
        registerField,
        validateField,
        validateForm,
        getFieldState,
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = () => useContext(ValidationContext);

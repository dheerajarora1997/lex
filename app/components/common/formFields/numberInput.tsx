import React, { ChangeEvent, useContext, useEffect } from "react";
import styles from "./styles/formFields.module.scss";
import { TextInputProps } from "./textInput";
import { ValidationContext } from "@/app/providers/validationProvider";

// Generic Number Input
export const NumberInput: React.FC<TextInputProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  rules,
}) => {
  const { registerField, validateField, getFieldState } =
    useContext(ValidationContext);
  const { error } = getFieldState(name) || {};

  useEffect(() => {
    if (rules) {
      registerField(name, rules);
    }
  }, [name, rules, registerField]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    validateField(name, e.target.value);
  };
  return (
    <div className={styles.form_field}>
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={error ? styles.has_error : ""}
      />
      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
};

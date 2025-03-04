import React, { ChangeEvent, useContext, useEffect, forwardRef } from "react";
import styles from "./styles/formFields.module.scss";
import { ValidationContext } from "@/app/providers/validationProvider";

export type ValidationRule = (value: string) => string | null;

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rules?: ValidationRule[];
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { label, name, placeholder, value, onChange, rules, ...inputProps },
    ref
  ) => {
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
        {label && <label htmlFor={name}>{label}</label>}
        <div>
          <input
            type="text"
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className={error ? styles.has_error : ""}
            ref={ref}
            max={100}
            maxLength={100}
            {...inputProps}
          />
        </div>

        {error && <div className={styles.error_message}>{error}</div>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

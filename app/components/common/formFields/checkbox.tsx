import React, { ChangeEvent } from "react";
import styles from "./styles/formFields.module.scss";

interface CheckboxProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

// Generic Checkbox
export const Checkbox = ({
  label,
  name,
  value,
  onChange,
  error,
}: CheckboxProps) => {
  return (
    <div className={styles.form_field}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={value}
        onChange={onChange}
        className={error ? styles.has_error : ""}
      />
      <label htmlFor={name}>{label}</label>
      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
};

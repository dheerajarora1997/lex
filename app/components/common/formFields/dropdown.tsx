import React, { ChangeEvent } from "react";
import styles from "./styles/formFields.module.scss";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  name: string;
  options: DropdownOption[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

// Generic Dropdown
export const Dropdown = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
}: DropdownProps) => {
  return (
    <div className={styles.form_field}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? styles.has_error : ""}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
};

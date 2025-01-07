import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import styles from "./styles/formFields.module.scss";
import { ValidationContext } from "@/app/providers/validationProvider";
import { ValidationRule } from "./textInput";
import Image from "next/image";

interface PasswordInputProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rules?: ValidationRule[];
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (rules && registerField && name) {
      registerField(name, rules);
    }
  }, [name, rules, registerField]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    validateField(name, e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.form_field}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.input_wrapper}>
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={error ? styles.has_error : ""}
        />
        <button
          type="button"
          className={styles.eye_button}
          onClick={toggleShowPassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            "👁️"
          ) : (
            <Image
              src={
                "https://storage.cloud.google.com/lex_assets/eye_hidden.png?authuser=1"
              }
              alt="eye hidden"
              width={24}
              height={24}
            />
          )}
        </button>
      </div>

      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
};

import { ButtonHTMLAttributes } from "react";
import styles from "./appButton.module.scss";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

const AppButton: React.FC<CustomButtonProps> = ({
  text,
  rightIcon,
  leftIcon,
  isLoading = false,
  className,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={`${styles.app_button} ${className} ${
        isLoading ? styles.loading : ""
      }`}
      style={{
        opacity: isLoading || disabled ? 0.5 : 1,
        cursor: isLoading || disabled ? "not-allowed" : "pointer",
      }}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? (
        <span className={styles.loader}></span>
      ) : (
        <>
          {leftIcon && <span className={styles.right_icon}>{leftIcon}</span>}
          {text && <span className={styles.text}>{text}</span>}
          {rightIcon && <span className={styles.left_icon}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default AppButton;

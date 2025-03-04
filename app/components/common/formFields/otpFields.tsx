// OtpInput.tsx
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { TextInput } from "./textInput";
import styles from "./styles/formFields.module.scss";

interface OtpInputProps {
  length: number;
  onComplete: (otp: string) => void;
  onClickResend?: () => void;
  resendTimer?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length,
  onComplete,
  onClickResend,
  resendTimer = 30,
}) => {
  const [otp, setOtp] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(resendTimer);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    onComplete(otp);
    if (otp.length === length) {
      setIsValid(true);
    } else if (otp.length > length) {
      setOtp(otp.slice(0, length));
      setIsValid(false);
    } else {
      setIsValid(false);
    }
  }, [otp, length, onComplete]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const onClickResendOtp = () => {
    setTimer(resendTimer);
    setOtp("");
    if (onClickResend) {
      onClickResend();
    }
  };

  const handleSingleOtpChange = (value: string) => {
    setOtp(value);
  };
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp.split("")];
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    if (value && index < length - 1) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };
  console.info(isValid);
  return (
    <div className={styles.form_field}>
      <TextInput
        name="otp_field"
        placeholder="OTP"
        value={otp || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSingleOtpChange(e.target.value)
        }
        // ref={(ref) => {
        //   if (ref) {
        //     inputRefs.current = ref;
        //   }
        // }}
        maxLength={6}
      ></TextInput>
      <div className={styles.otp_input} style={{ display: "none" }}>
        {Array.from({ length }).map((_, index) => (
          <TextInput
            key={index}
            name="otp_field"
            placeholder="-"
            value={otp[index] || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleOtpChange(index, e.target.value)
            }
            ref={(ref) => {
              if (ref) {
                inputRefs.current[index] = ref;
              }
            }}
            maxLength={1}
          />
        ))}
      </div>
      <div className={`${styles.resend_timer} ${!timer ? "inactive" : ""}`}>
        {timer ? (
          <span>Resend {timer} sec</span>
        ) : (
          <button
            className={styles.resend_button}
            onClick={onClickResendOtp}
            type="button"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default OtpInput;

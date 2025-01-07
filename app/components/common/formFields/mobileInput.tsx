import React, { useState } from "react";
import styles from "./styles/formFields.module.scss";

interface MobileNumberProps {
  countryCode?: string;
  phoneNumber: string;
  onPhoneNumberChange: (phoneNumber: string) => void;
}

const MobileNumberField: React.FC<MobileNumberProps> = ({
  countryCode = "+91",
  phoneNumber,
  onPhoneNumberChange,
}) => {
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPhoneNumber = event.target.value;
    setLocalPhoneNumber(newPhoneNumber);
    onPhoneNumberChange(newPhoneNumber);
  };

  return (
    <div className={styles.form_field}>
      <label>{"Mobile Number"}</label>
      <div className={styles.mobile_number_field}>
        <div className={styles.country_code}>
          <select defaultValue={countryCode}>
            <option value="91">+91</option>
          </select>
        </div>
        <div className={styles.phone_number}>
          <input
            type="tel"
            placeholder="XXX XXX XXXX"
            value={localPhoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNumberField;

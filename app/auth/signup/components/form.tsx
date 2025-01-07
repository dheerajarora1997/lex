import { ChangeEvent, SetStateAction, useContext, Dispatch } from "react";
import { RegistrationRequest } from "../../models/signupModels";
import { TextInput } from "@/app/components/common/formFields/textInput";
import { EmailInput } from "@/app/components/common/formFields/emailInput";
import MobileNumberField from "@/app/components/common/formFields/mobileInput";
import { PasswordInput } from "@/app/components/common/formFields/passwordInput";
import { Dropdown } from "@/app/components/common/formFields/dropdown";
import { USER_TYPE_OPTIONS } from "../constants";
import { emailInputRules, passwordInputRules } from "../../login/constants";
import AuthFooter from "../../components/authFooter";
import { ValidationContext } from "@/app/providers/validationProvider";
import styles from "../../styles/login.module.scss";

function SignupForm({
  formData,
  onChangeFormField,
  isLoading,
  onClickSignup,
  setFormData,
}: {
  formData: RegistrationRequest;
  onChangeFormField: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onClickSignup: () => void;
  isLoading: boolean;
  setFormData: Dispatch<SetStateAction<RegistrationRequest>>;
}) {
  const { validateForm } = useContext(ValidationContext);

  return (
    <div className={styles.auth_form_container}>
      <form>
        <div className={styles.flex_container}>
          <TextInput
            label="First Name"
            name="first_name"
            placeholder="Enter First Name"
            value={formData?.first_name ?? ""}
            onChange={onChangeFormField}
          />
          <TextInput
            label="Last Name"
            name="last_name"
            placeholder="Enter Last Name"
            value={formData?.last_name ?? ""}
            onChange={onChangeFormField}
          />
        </div>
        <EmailInput
          label="Email"
          name="email"
          placeholder="Enter Email"
          value={formData?.email ?? ""}
          onChange={onChangeFormField}
          rules={emailInputRules}
        />

        <MobileNumberField
          phoneNumber={formData?.phone ? formData?.phone + "" : ""}
          onPhoneNumberChange={(phone) => {
            setFormData((prev) => ({
              ...prev,
              phone: +phone,
            }));
          }}
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter Password"
          value={formData?.password ?? ""}
          onChange={onChangeFormField}
          rules={passwordInputRules}
        />
        <Dropdown
          label="User Type"
          name="user_type"
          options={USER_TYPE_OPTIONS}
          value={formData?.user_type ?? ""}
          onChange={onChangeFormField}
        />
      </form>
      <AuthFooter
        isPrimaryButtonLoading={isLoading}
        onClickPrimaryButton={() => {
          if (validateForm()) {
            onClickSignup();
          }
        }}
      />
    </div>
  );
}

export default SignupForm;

import AppButton from "@/app/components/common/appButton";
import styles from "../styles/authLayout.module.scss";

function AuthFooter({
  btnText,
  onClickPrimaryButton,
  // onClickSecondaryButton,
  isPrimaryButtonLoading,
  btnDisableState,
}: {
  btnText?: string;
  onClickPrimaryButton?: () => void;
  onClickSecondaryButton?: () => void;
  isPrimaryButtonLoading?: boolean;
  btnDisableState?: boolean;
}) {
  return (
    <div>
      <AppButton
        text={`${btnText ? btnText : "Continue"}`}
        onClick={onClickPrimaryButton}
        className={styles.auth_footer_primary_btn}
        isLoading={isPrimaryButtonLoading}
        disabled={isPrimaryButtonLoading || btnDisableState}
      />
    </div>
  );
}

export default AuthFooter;

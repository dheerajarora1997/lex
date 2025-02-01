import AppButton from "@/app/components/common/appButton";
import styles from "../styles/authLayout.module.scss";

function AuthFooter({
  onClickPrimaryButton,
  // onClickSecondaryButton,
  isPrimaryButtonLoading,
}: {
  onClickPrimaryButton?: () => void;
  onClickSecondaryButton?: () => void;
  isPrimaryButtonLoading?: boolean;
}) {
  return (
    <div>
      <AppButton
        text="Continue"
        onClick={onClickPrimaryButton}
        className={styles.auth_footer_primary_btn}
        isLoading={isPrimaryButtonLoading}
        disabled={isPrimaryButtonLoading}
      />
    </div>
  );
}

export default AuthFooter;

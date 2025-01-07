import styles from "../styles/authLayout.module.scss";

interface AuthHeaderProps {
  title: string;
  subtitle: React.ReactNode;
}

function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className={styles.auth_header}>
      <span className={styles.title}>{title}</span>
      <span className={styles.subtitle}>{subtitle}</span>
    </div>
  );
}

export default AuthHeader;

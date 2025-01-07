import styles from "../styles/authLayout.module.scss";
import Image from "next/image";

interface ConfirmationViewProps {
  title: string;
  description: string;
  imageSrc: string;
}

function ConfirmationView({
  imageSrc,
  title,
  description,
}: ConfirmationViewProps) {
  return (
    <div className={styles.auth_confirmation_container}>
      <Image src={imageSrc} alt="confirmation" width={67} height={67} />

      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </div>
  );
}

export default ConfirmationView;

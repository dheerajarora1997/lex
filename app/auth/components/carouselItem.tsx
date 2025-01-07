import styles from "../styles/authCarousel.module.scss";

function AuthCarouselItem({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className={styles.auth_carousel_item}>
      <div className={styles.top}>
        <p className={styles.title}>{title}</p>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
      <div></div>
    </div>
  );
}

export default AuthCarouselItem;

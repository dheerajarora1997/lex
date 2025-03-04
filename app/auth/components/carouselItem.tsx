import styles from "../styles/authCarousel.module.scss";

function AuthCarouselItem({
  title,
  subtitle,
  imagePath,
}: {
  title: string;
  subtitle: string;
  imagePath?: string;
}) {
  return (
    <div className={styles.auth_carousel_item}>
      <div className={styles.top}>
        <p className={styles.title}>{title}</p>
        <span className={styles.subtitle}>{subtitle}</span>
        <img
          src={imagePath}
          alt="carousel"
          className="d-inline-block"
          style={{ width: "100%", maxWidth: 350, margin: "20px auto 0" }}
        />
      </div>
      <div></div>
    </div>
  );
}

export default AuthCarouselItem;

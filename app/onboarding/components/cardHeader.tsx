import styles from "../styles/onboarding.module.scss";

function CardHeader() {
  return (
    <div className={styles.card_header}>
      <div className={styles.details_container}>
        <span className={styles.title}>Searching The Lex Way</span>
        {/* <span className={styles.description}>
          { 
            "You're probably used to searching cases using keywords. Here's how you can achieve the same results and more using Lex."
          }
        </span> */}
      </div>
    </div>
  );
}

export default CardHeader;
{
}

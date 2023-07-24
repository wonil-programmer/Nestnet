import styles from "./Achievement.module.css";
function Achievement({ year, details }) {
  return (
    <>
      <li className={styles.achievement}>
        <h3 className={styles.year}>{year}</h3>
        <div className={styles.details__box}>
          <p>
            <ul className={styles.details}>
              {details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </p>
        </div>
      </li>
    </>
  );
}
export default Achievement;

import styles from "./WeatherDetails.module.css";
function WeatherDetails({ detail, value }) {
  return (
    <div className={styles.detailContainer}>
      <p className={styles.detail}>okay</p>
      <p className={styles.value}>18&deg;</p>
    </div>
  );
}

export default WeatherDetails;

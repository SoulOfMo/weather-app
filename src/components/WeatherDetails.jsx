import styles from "./WeatherDetails.module.css";
function WeatherDetails({ detail, value, unit }) {
  return (
    <div className={styles.detailContainer}>
      <p className={styles.detail}>{detail}</p>
      <p className={styles.value}>
        {value}
        {unit}
      </p>
    </div>
  );
}

export default WeatherDetails;

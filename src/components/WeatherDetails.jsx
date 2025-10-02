import styles from "./WeatherDetails.module.css";
function WeatherDetails({ detail, value }) {
  return (
    <div className={styles.detailContainer}>
      <p className={styles.detail}>{detail}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

export default WeatherDetails;

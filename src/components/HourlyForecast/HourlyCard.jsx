import styles from "./HourlyCard.module.css";
import { weatherIcon } from "../weatherIcon";

function HourlyCard({ hourInfo, isLoading }) {
  if (isLoading) {
    return <div className={`${styles.hourlyCard} ${styles.loading}`}></div>;
  }

  const { time, temp, wC } = hourInfo;
  if (!hourInfo) return null;
  return (
    <div className={styles.hourlyCard}>
      <div className={styles.time}>
        <img src={weatherIcon(wC)} alt="weathertype-icon" />
        <p>{time}</p>
      </div>
      <p className={styles.temp}>{Math.floor(temp)}&deg;</p>
    </div>
  );
}

export default HourlyCard;

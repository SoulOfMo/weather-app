import styles from "./DailyCard.module.css";

import { weatherIcon } from "../weatherIcon";
function DailyCard({ dayInfo, day, isLoading }) {
  if (isLoading) {
    return <div className={`${styles.dailyItem} ${styles.loading}`}></div>;
  }

  const { maxTemp, minTemp, wC } = dayInfo;
  return (
    <div className={styles.dailyItem}>
      <span className={styles.day}>{day}</span>
      <img src={weatherIcon(wC)} alt="cloudIcon"></img>
      <span className={styles.dailyTemp}>
        <span className={styles.maxTemp}>{Math.floor(maxTemp)}&deg;</span>
        <span className={styles.minTemp}>{Math.floor(minTemp)}&deg;</span>
      </span>
    </div>
  );
}

export default DailyCard;

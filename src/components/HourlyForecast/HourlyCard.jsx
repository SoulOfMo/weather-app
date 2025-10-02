import styles from "./HourlyCard.module.css";
import { weatherIcon } from "../weatherIcon";

function HourlyCard({ hourInfo, isLoading }) {
  if (isLoading) {
    return <div className={`${styles.hourlyCard} ${styles.loading}`}></div>;
  }
  console.log(hourInfo);
  const { time, temp, wC } = hourInfo;
  if (!hourInfo) return null;
  // import all the weather icon and implement a code that says if the wc falls btw a range should a specific weather icon
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

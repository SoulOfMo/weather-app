import styles from "./DailyCard.module.css";
import cloudIcon from "../../assets/images/icon-rain.webp";
function DailyCard() {
  return (
    <div className={styles.dailyItem}>
      <span className={styles.day}>Mon</span>
      <img src={cloudIcon} alt="cloudIcon"></img>
      <span className={styles.dailyTemp}>
        <span className={styles.maxTemp}>14&deg;</span>
        <span className={styles.minTemp}>20&deg;</span>
      </span>
    </div>
  );
}

export default DailyCard;

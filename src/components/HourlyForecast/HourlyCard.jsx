import styles from "./HourlyCard.module.css";
import rainIcon from "../../assets/images/icon-rain.webp";
function HourlyCard() {
  return (
    <div className={styles.hourlyCard}>
      <div className={styles.time}>
        <img src={rainIcon} alt="weathertype-icon" />
        <p>3 PM</p>
      </div>
      <p className={styles.temp}>20&deg;</p>
    </div>
  );
}

export default HourlyCard;

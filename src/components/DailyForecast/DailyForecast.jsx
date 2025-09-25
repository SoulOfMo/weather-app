import styles from "./DailyForecast.module.css";
import DailyCard from "./DailyCard";

function DailyForecast() {
  return (
    <div className={styles.dailyForecastContainer}>
      <p>Daily forecast</p>
      <div className={styles.dailyCards}>
        {Array.from({ length: 7 }, (_, i) => (
          <DailyCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default DailyForecast;

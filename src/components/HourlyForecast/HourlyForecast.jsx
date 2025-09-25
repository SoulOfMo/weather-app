import styles from "./HourlyForecast.module.css";

import HourlyCard from "./HourlyCard";
import dropdownIcon from "../../assets/images/icon-dropdown.svg";

function HourlyForecast() {
  return (
    <div className={styles.hourlyForecastContainer}>
      <div className={styles.title}>
        <p>Hourly Forecast</p>

        {/* Loop over the day hourly result and each day is put in the option element */}
        <button>
          <span>Monday</span>
          <img src={dropdownIcon} alt="" />
        </button>
      </div>
      <div className={styles.divider}>
        {Array.from({ length: 12 }, (_, i) => (
          <HourlyCard key={i} />
        ))}
      </div>

      {false && (
        <div className={styles.dropdownContainer}>
          <button className={styles.active}>Tuesday</button>
          <button>Wednesday</button>
          <button>Thursday</button>
          <button>Friday</button>
          <button>Saturday</button>
          <button>Sunday</button>
          <button>Monday</button>
        </div>
      )}
      {/* Loop over the hourly result and each hour is put in the HourlyCard component */}
    </div>
  );
}

export default HourlyForecast;

import styles from "./HourlyForecast.module.css";
import HourlyCard from "./HourlyCard";
import dropdownIcon from "../../assets/images/icon-dropdown.svg";
import { useDropdown } from "../../assets/hooks/useDropdown";
import { useState, useMemo } from "react";

function HourlyForecast({ hourlyData, isLoading }) {
  const { open, setOpen, ref } = useDropdown();
  const [activeDay, setActiveDay] = useState(0);

  // prepare grouped forecast only when data is available
  const { dailyHourlyForecast, presendDay, days } = useMemo(() => {
    if (!hourlyData) {
      return { dailyHourlyForecast: [], presendDay: "_", days: [] };
    }

    const { time, temperature_2m, weather_code } = hourlyData;
    const grouped = {};

    time.forEach((t, i) => {
      const date = new Date(t);
      const day = date.toLocaleDateString("en-CA");

      const hour = date.toLocaleTimeString("en-us", {
        hour: "numeric",
        hour12: true,
      });

      if (!grouped[day]) grouped[day] = [];
      grouped[day].push({
        time: hour,
        temp: temperature_2m[i],
        wC: weather_code[i],
      });
    });

    const dailyHourlyForecast = Object.entries(grouped)
      .map(([day, hoursDetails]) => ({ date: day, hoursDetails }))
      .slice(0);

    const presentDate = new Date(dailyHourlyForecast[activeDay]?.date);
    const presendDay = presentDate.toLocaleDateString("en-us", {
      weekday: "long",
    });

    const days = dailyHourlyForecast.map((day) => {
      const date = new Date(day.date);
      return date.toLocaleDateString("en-us", { weekday: "long" });
    });

    return { dailyHourlyForecast, presendDay, days };
  }, [hourlyData, activeDay]);

  return (
    <div className={styles.hourlyForecastContainer}>
      <div className={styles.title}>
        <p>Hourly Forecast</p>
        <button onClick={() => setOpen((active) => !active)}>
          <span>{presendDay}</span>
          <img src={dropdownIcon} alt="" />
        </button>
      </div>

      <div className={styles.divider}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <HourlyCard key={i} isLoading={true} />
            ))
          : dailyHourlyForecast[activeDay]?.hoursDetails.map((hour, i) => (
              <HourlyCard key={i} hourInfo={hour} />
            ))}
      </div>

      {open && (
        <div ref={ref} className={styles.dropdownContainer}>
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveDay(i);
                setOpen(!open);
              }}
            >
              {day}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default HourlyForecast;

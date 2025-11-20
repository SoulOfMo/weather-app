import styles from "./DailyForecast.module.css";
import DailyCard from "./DailyCard";

function DailyForecast({ dailyData }) {
  const isLoading = !dailyData;

  if (isLoading) {
    return (
      <div className={styles.dailyForecastContainer}>
        <p>Daily forecast</p>
        <div className={styles.dailyCards}>
          {Array.from({ length: 7 }).map((_, i) => (
            <DailyCard key={i} go="ay0" isLoading={true} />
          ))}
        </div>
      </div>
    );
  }

  const { weather_code, temperature_2m_max, temperature_2m_min, time } =
    dailyData;

  const grouped = {};

  time.forEach((t, i) => {
    const date = new Date(t);
    const day = date.toISOString().split("T")[0];

    if (!grouped[day]) grouped[day] = [];
    grouped[day].push({
      maxTemp: temperature_2m_max[i],
      minTemp: temperature_2m_min[i],
      wC: weather_code[i],
    });
  });

  const dailyForecast = Object.entries(grouped).map(([day, dayDetails]) => ({
    date: day,
    dayDetails,
  }));

  const days = dailyForecast.map((day) => {
    const date = new Date(day.date);
    return date.toLocaleDateString("en-us", { weekday: "short" });
  });

  return (
    <div className={styles.dailyForecastContainer}>
      <p>Daily forecast</p>
      <div className={styles.dailyCards}>
        {dailyForecast.map((data, i) => (
          <DailyCard key={i} day={days[i]} dayInfo={data.dayDetails[0]} />
        ))}
      </div>
    </div>
  );
}

export default DailyForecast;

import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  baseData: {},
  country: "",
  city: "",
  isLoading: false,
  weatherCode: "",
  error: {},
  pos: { lat: "", lng: "" },
  currentTemp: "",
  apparentTemp: "_",
  humidity: "_",
  wind: "_",
  precipitation: "_",
  hourlyData: "",
  dailyData: "",
  measurementUnit: "metric",
  tempUnit: "C",
  windSpeedUnit: "km/h",
  precipitationUnit: "mm",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "data/loaded":
      return {
        ...state,
        isLoading: false,
        measurementUnit: "metric",
        tempUnit: "C",
        windSpeedUnit: "km/h",
        precipitationUnit: "mm",

        baseData: {
          currentTemp: action.payload.current.temperature_2m,
          apparentTemp: action.payload.current.apparent_temperature,
          humidity: action.payload.current.relative_humidity_2m,
          wind: action.payload.current.wind_speed_10m,
          precipitation: action.payload.current.precipitation,
          hourlyData: action.payload.hourly,
          dailyData: action.payload.daily,
        },
        currentTemp: action.payload.current.temperature_2m,
        apparentTemp: action.payload.current.apparent_temperature,
        humidity: action.payload.current.relative_humidity_2m,
        wind: action.payload.current.wind_speed_10m,
        precipitation: action.payload.current.precipitation,
        hourlyData: action.payload.hourly,
        dailyData: action.payload.daily,
        weatherCode: action.payload.current.weather_code,
      };

    case "pos/update":
      return {
        ...state,
        pos: { lat: action.payload.latitude, lng: action.payload.longitude },
        country: action.payload.country,
        city: action.payload.name,
      };

    case "measurementUnit/change": {
      const toImperial = state.measurementUnit === "metric";

      // Conversion functions
      const temp = (t) => (toImperial ? (t * 9) / 5 + 32 : (t - 32) * (5 / 9));
      // const wind = (w) => (toImperial ? w / 1.60934 : w * 1.60934);
      const precip = (p) => (toImperial ? p / 25.4 : p * 25.4);

      const base = state.baseData;

      const hourlyConverted = state.hourlyData
        ? {
            ...state.hourlyData,
            temperature_2m: state.hourlyData.temperature_2m.map(temp),
          }
        : null;

      const dailyConverted = state.dailyData
        ? {
            ...state.dailyData,
            temperature_2m_max: state.dailyData.temperature_2m_max.map(temp),
            temperature_2m_min: state.dailyData.temperature_2m_min.map(temp),
          }
        : null;

      return {
        ...state,
        currentTemp: temp(state.currentTemp),
        apparentTemp: temp(state.apparentTemp),
        wind: toImperial ? base.wind / 1.60934 : base.wind,
        precipitation: precip(state.precipitation),
        hourlyData: hourlyConverted,
        dailyData: dailyConverted,
        measurementUnit:
          state.measurementUnit === "metric" ? "imperial" : "metric",
        windSpeedUnit: toImperial ? "mph" : "km/h",
        tempUnit: toImperial ? "F" : "C",
        precipitationUnit: toImperial ? "in" : "mm",
      };
    }

    case "tempUnit/change": {
      const temp = (t) =>
        state.tempUnit === "C" ? (t * 9) / 5 + 32 : (t - 32) * (5 / 9);

      const hourlyConverted = state.hourlyData
        ? {
            ...state.hourlyData,
            temperature_2m: state.hourlyData.temperature_2m.map(temp),
          }
        : null;

      const dailyConverted = state.dailyData
        ? {
            ...state.dailyData,
            temperature_2m_max: state.dailyData.temperature_2m_max.map(temp),
            temperature_2m_min: state.dailyData.temperature_2m_min.map(temp),
          }
        : null;

      return {
        ...state,
        tempUnit: state.tempUnit === "C" ? "F" : "C",
        measurementUnit: state.tempUnit === "C" ? "imperial" : "metric",
        currentTemp: temp(state.currentTemp),
        hourlyData: hourlyConverted,
        dailyData: dailyConverted,
        apparentTemp: temp(state.apparentTemp),
      };
    }

    case "windSpeedUnit/change": {
      // const base = state.baseData;
      const convertWind = (w) =>
        state.windSpeedUnit === "km/h" ? w / 1.60934 : w * 1.60934;

      return {
        ...state,
        windSpeedUnit: state.windSpeedUnit === "km/h" ? "mph" : "km/h",
        wind: convertWind(state.wind),
      };
    }

    case "precipitationUnit/change":
      return {
        ...state,
        precipitationUnit: state.precipitationUnit === "mm" ? "in" : "mm",
      };

    case "error":
      return { ...state, isLoading: false, error: action.payload };
  }
}

const WeatherContext = createContext();

function WeatherContextProvider({ children }) {
  const [
    {
      country,
      city,
      isLoading,
      weatherCode,
      error,
      pos,
      currentTemp,
      apparentTemp,
      humidity,
      wind,
      precipitation,
      hourlyData,
      dailyData,
      measurementUnit,
      tempUnit,
      windSpeedUnit,
      precipitationUnit,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!pos.lat || !pos.lng) return;

    async function Apicall() {
      dispatch({ type: "loading" });

      try {
        const today = new Date().toLocaleDateString("en-CA");
        let endDate = new Date();
        endDate.setDate(new Date().getDate() + 6);
        endDate = endDate.toLocaleDateString("en-CA");

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${pos.lat}&longitude=${pos.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,wind_speed_10m,precipitation,relative_humidity_2m,apparent_temperature&start_date=${today}&end_date=${endDate}`
        );
        const data = await res.json();
        dispatch({
          type: "data/loaded",
          payload: data,
        });
      } catch (error) {
        console.log(error.message);
        dispatch({ type: "error", payload: error.message });
      }
    }

    Apicall();
  }, [pos]);

  return (
    <WeatherContext.Provider
      value={{
        country,
        city,
        isLoading,
        weatherCode,
        error,
        pos,
        currentTemp,
        apparentTemp,
        humidity,
        wind,
        precipitation,
        hourlyData,
        dailyData,
        dispatch,
        measurementUnit,
        tempUnit,
        windSpeedUnit,
        precipitationUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    console.log("context was used over the declared");
  }
  return context;
};

export { WeatherContextProvider, useWeatherContext };

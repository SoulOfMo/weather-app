import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  country: "",
  city: "",
  isLoading: false,
  weather: "",
  error: {},
  pos: { lat: 3.3792, lng: 6.5244 },
  currentTemp: "",
  apparentTemp: "_",
  humidity: "_",
  wind: "_",
  precipitation: "_",
  hourlyData: "",
  dailyData: "",
  measurementUnit: "metric",
  tempUnit: "C",
  windSpeedUnit: "kmh",
  precipitationUnit: "mm",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "country/city/loaded":
      return { ...state, isLoading: false };

    case "data/loaded":
      return {
        ...state,
        isLoading: false,
        currentTemp: action.payload.current.temperature_2m,
        apparentTemp: action.payload.current.apparent_temperature,
        humidity: action.payload.current.relative_humidity_2m,
        wind: action.payload.current.wind_speed_10m,
        precipitation: action.payload.current.precipitation,
        hourlyData: action.payload.hourly,
        dailyData: action.payload.daily,
        weather: action.payload.current.weather_code,
      };

    case "pos/update":
      return {
        ...state,
        pos: { lat: action.payload.latitude, lng: action.payload.longitude },
        country: action.payload.country,
        city: action.payload.name,
      };

    case "measurementUnit/change":
      return {
        ...state,
        measurementUnit:
          state.measurementUnit === "metric" ? "imperial" : "metric",
      };

    case "tempUnit/change":
      return {
        ...state,
        tempUnit: action.payload,
      };

    case "windSpeedUnit/change":
      return {
        ...state,
        windSpeedUnit: action.payload,
      };

    case "precipitationUnit/change":
      return {
        ...state,
        precipitationUnit: action.payload,
      };
    //differnt errorType for different, ask gpt
    //   case "error":
    //     return { ...state, isLoading: false, error:{...state.error, action.payload} };
    // }

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
      weather,
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
        console.log(data);
        console.log(data.hourly);
        dispatch({
          type: "data/loaded",
          payload: data,
        });
        console.log(data.hourly);
      } catch (error) {
        dispatch({ type: "error", payload: error.message });
      }
    }

    Apicall();
  }, [pos]);

  console.log(hourlyData);

  return (
    <WeatherContext.Provider
      value={{
        country,
        city,
        isLoading,
        weather,
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
    ("context was used over the declared");
  }
  return context;
};

export { WeatherContextProvider, useWeatherContext };

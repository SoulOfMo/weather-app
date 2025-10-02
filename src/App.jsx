import Header from "./components/Header";
import Search from "./components/Search";
import WeatherInfo from "./components/WeatherInfo";

import { WeatherContextProvider } from "./contexts/WeatherContext";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <WeatherContextProvider>
      <AppLayout>
        <Header />
        <main>
          <Search />
          <WeatherInfo />
        </main>
      </AppLayout>
    </WeatherContextProvider>
  );
}

export default App;

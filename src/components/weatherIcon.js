import rainIcon from "../assets/images/icon-rain.webp";
import drizzleIcon from "../assets/images/icon-drizzle.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import partlyCloudlyIcon from "../assets/images/icon-partly-cloudy.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import stormIcom from "../assets/images/icon-storm.webp";
import sunnyIcon from "../assets/images/icon-sunny.webp";
import overcastIcon from "../assets/images/icon-overcast.webp";
export function weatherIcon(wC) {
  if (wC === 0) return sunnyIcon;
  if (wC === 1 || wC === 2) return partlyCloudlyIcon;
  if (wC === 3) return overcastIcon;
  if (wC === 45 || wC === 48) return fogIcon;
  if (wC >= 51 && wC <= 55) return drizzleIcon;
  if (wC >= 61 && wC <= 65) return rainIcon;
  if (wC >= 71 && wC <= 77) return snowIcon;
  if (wC >= 80 && wC <= 82) return rainIcon;
  if (wC >= 95 && wC <= 99) return stormIcom;
  return sunnyIcon;
}

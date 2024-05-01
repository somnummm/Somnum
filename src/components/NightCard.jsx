import PropTypes from "prop-types";
import moment from "moment";
import MoonIcon from "../assets/icons/moon.jsx";

const NightCard = ({ night }) => {
  // Calculer la durée en heures
  let sleepTime = moment(night.sleep_time, "HH:mm:ss");
  let wakeTime = moment(night.wake_time, "HH:mm:ss");

  // Si l'heure du réveil est antérieure à l'heure du coucher, ajouter une journée à l'heure du réveil
  if (wakeTime.isBefore(sleepTime)) {
    wakeTime.add(1, "days");
  }

  // Calculer la durée en minutes
  let duration = wakeTime.diff(sleepTime, "minutes");

  // Convertir la durée en heures et minutes
  let hours = Math.floor(duration / 60);
  let minutes = duration % 60;

  return (
    <li className="pt-3 pb-0 sm:pt-4 bg-white border border-gray-200 rounded-lg shadow my-2">
      <div className="flex items-center ">
        <div className="flex-shrink-0">
          <MoonIcon color="teal-600" />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            Nuit du {moment(night.created_at).format("DD/MM/YYYY")}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {night.sleep_time}→{night.wake_time}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {hours}h{minutes}
        </div>
      </div>
    </li>
  );
};

NightCard.propTypes = {
  night: PropTypes.object.isRequired,
};

export default NightCard;

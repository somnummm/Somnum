import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";

const Night = () => {
  const [sleepData, setSleepData] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  Chart.register(
    CategoryScale,
    LinearScale,
    LineController,
    PointElement,
    LineElement
  );

  //il faut générer un objet {time: 0, duration: 60, state: 0} pour chaque tranche de sommeil
  const generateSleepData = async () => {
    const sleepData = [];
    let currentTime = 1320; //22h en minutes

    //génère un nombre de minutes de sommeil aléatoire entre 8 et 10h (480 et 600 minutes)
    const sleepDuration = Math.floor(Math.random() * 120) + 480;
    console.log("Sleep duration", sleepDuration / 60, "hours");

    const inter = 10;
    //je veux 20 points pour le graphique
    const sleepInterval = sleepDuration / inter;
    //je veux 4 états de sommeil
    const sleepStates = [0, 1, 2, 3];
    //génère 20 points pour le graphique mais il faut que cela fasse la durée du sommeil
    for (let i = 0; i < inter; i++) {
      const state = sleepStates[Math.floor(Math.random() * 4)];
      const duration = Math.floor(Math.random() * 10) + 5;
      const hours = Math.floor(Math.round(currentTime / 60)) % 24;
      const minutes = Math.round(currentTime) % 60;
      const time = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      sleepData.push({
        time: time,
        duration: duration,
        state: state,
      });
      currentTime += sleepInterval;
    }

    setSleepData(sleepData);
    setIsSimulating(false);
    return sleepData;
  };

  useEffect(() => {
    if (isSimulating) {
      console.log("Simulation started");
      generateSleepData();
    }
  }, [isSimulating, sleepData]);

  const getStateName = (state) => {
    switch (state) {
      case 0:
        return "REM";
      case 1:
        return "Deep";
      case 2:
        return "Core";
      default:
        return "Awake";
    }
  };

  const chartData = {
    labels: sleepData.map((data) => data.time),
    datasets: [
      {
        label: "Sleep State",
        data: sleepData.map((data) => ({ y: data.state, x: data.time })), // Utilisez yAxisID pour lier l'état correspondant
        fill: false,
        borderColor: "white",
        tension: 0.1,
        yAxisID: "states",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        id: "states",
        type: "category",
        labels: ["Awake", "REM", "Core", "Deep"],
      },
    },
  };

  return (
    <div>
      <h1>Suivi du sommeil</h1>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          setIsSimulating((prevIsSimulating) => !prevIsSimulating);
        }}
      >
        {isSimulating
          ? "Arrêter le suivi du sommeil.."
          : "Démarrer le suivi du sommeil"}
      </button>
      <div className="p-4 bg-blue-500 rounded-lg shadow-lg">
        <Line data={chartData} options={chartOptions} />
      </div>
      {chartData.labels.length > 0 && (
        <div>
          <h2>Détails du sommeil</h2>
          <table>
            <thead>
              <tr>
                <th>Temps</th>
                <th>Durée</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              {sleepData.map((data, index) => (
                <tr key={index}>
                  <td>{data.time}</td>
                  <td>{data.duration}</td>
                  <td>{getStateName(data.state)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Night;

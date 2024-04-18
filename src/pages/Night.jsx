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

  const generateSleepData = async () => {
    const sleepData = [];
    let currentTime = 0;
    while (currentTime < 480) {
      const duration = Math.floor(Math.random() * 60) + 30; // Durée aléatoire entre 30 et 90 minutes
      const state = Math.floor(Math.random() * 3);
      setSleepData((prevSleepData) => [
        ...prevSleepData,
        { time: currentTime, duration, state },
      ]);
      currentTime += duration;
    }
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
        labels: [
          "Sommeil paradoxal",
          "Sommeil profond",
          "Sommeil léger",
          "État classique",
        ],
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

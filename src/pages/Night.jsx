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
    const sleepStates = ["deep", "core", "rem", "awake"];
    const transitions = {
      deep: ["core", "rem", "awake"],
      core: ["deep", "rem"],
      rem: ["core"],
      awake: ["core"],
    };

    let currentState = "deep"; // Commencez par l'état "deep"

    for (let i = 0; i < inter; i++) {
      const possibleStates = transitions[currentState];
      const state =
        possibleStates[Math.floor(Math.random() * possibleStates.length)];
      const duration = Math.floor(Math.random() * 31) + 30; // Durée aléatoire entre 30 et 60 minutes
      const hours = Math.floor(Math.round(currentTime / 60)) % 24;
      const minutes = Math.round(currentTime) % 60;
      const time = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;

      sleepData.push({
        time: time,
        duration: duration,
        state: sleepStates.indexOf(state),
      });

      currentTime += duration;
      currentState = state;
    }
    //ajoute un état d'éveil au début et à la fin
    sleepData[0].state = 3;
    sleepData[sleepData.length - 1].state = 3;
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
  const getColorClass = (state) => {
    console.log("State", state);
    switch (state) {
      case "Deep":
        return "bg-violet-500";
      case "Core":
        return "bg-blue-400";
      case "REM":
        return "bg-fuchsia-500";
      case "Awake":
        return "bg-amber-400";
      default:
        return "";
    }
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
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Détails du sommeil</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Temps</th>
              <th className="px-4 py-2">État</th>
            </tr>
          </thead>
          <tbody>
            {sleepData
              .reduce((acc, data, index, arr) => {
                if (index === 0 || data.state !== arr[index - 1].state) {
                  acc.push(data);
                }
                return acc;
              }, [])
              .map((data, index) => (
                <tr
                  key={index}
                  className={getColorClass(getStateName(data.state))}
                >
                  <td className="px-4 py-2">{data.time}</td>
                  <td className="px-4 py-2">{getStateName(data.state)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Night;

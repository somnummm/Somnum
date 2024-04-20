import { useState } from "react";
import generateSleepData from "../store/night";
import LoaderNight from "../components/LoaderNight";
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
  const [isSimulated, setIsSimulated] = useState(false);

  Chart.register(
    CategoryScale,
    LinearScale,
    LineController,
    PointElement,
    LineElement
  );

  const simulateSleep = async () => {
    setIsSimulating(true);
    const newData = await generateSleepData();
    setSleepData(newData);

    //arrrête l'animation après 10 secondes
    setTimeout(() => {
      setIsSimulating(false);
      setIsSimulated(true);
    }, 10000);
  };

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
      {!isSimulating && !isSimulated && (
        <div className="flex items-center justify-center min-h-screen">
          <button
            type="submit"
            // className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              simulateSleep();
            }}
          >
            Démarrer le suivi du sommeil
          </button>
        </div>
      )}

      {isSimulating && (
        <div className="flex items-center justify-center min-h-screen">
          <LoaderNight />
        </div>
      )}

      {isSimulated && (
        <main>
          <div className="p-4 bg-blue-500 rounded-lg shadow-lg">
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="p-4 mb-10">
            <h2 className="text-2xl font-bold mb-4">Détails du sommeil</h2>
            <table className="w-full table-auto ">
              <thead>
                <tr>
                  <th className="px-4 py-2">Heure</th>
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
        </main>
      )}
    </div>
  );
};

export default Night;

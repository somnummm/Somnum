import { useState, useEffect } from "react";
import generateSleepData from "../store/night";
import LoaderNight from "../components/LoaderNight";
import { ArrowDown } from "../assets/icons/arrowDown";
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
  const [isDetailDisplayed, setIsDetailDisplayed] = useState(false);
  const [stats, setStats] = useState({});

  Chart.register(
    CategoryScale,
    LinearScale,
    LineController,
    PointElement,
    LineElement
  );
  const calculateTotalTimePerState = (data) => {
    return data.reduce((acc, curr) => {
      if (!acc[curr.state]) {
        acc[curr.state] = 0;
      }
      acc[curr.state] += curr.duration;
      return acc;
    }, {});
  };

  const simulateSleep = async () => {
    setIsSimulating(true);
    const newData = await generateSleepData();
    setSleepData(newData);
    setTimeout(() => {
      setIsSimulating(false);
      setIsSimulated(true);
    }, 1000);
  };

  useEffect(() => {
    const updateStats = async () => {
      const totalTimePerState = await calculateTotalTimePerState(sleepData);
      setStats(totalTimePerState);
    };

    if (isSimulated) {
      updateStats();
    }
  }, [sleepData, isSimulated]);

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
        color: "white",
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
      <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-purple-400 via-purple-600 to-purple-700 bg-clip-text text-4xl font-extrabold text-transparent text-center select-auto">
        Suivi du sommeil
      </h1>

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
          <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-lg shadow-lg">
            <Line data={chartData} options={chartOptions} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">Stats</h2>

            <div className="flex flex-col items-center">
              <div className="grid grid-cols-2 gap-4">
                {stats &&
                  Object.keys(stats).map((key, index) => (
                    <div
                      key={index}
                      className={`${getColorClass(
                        getStateName(parseInt(key))
                      )} block max-w-sm p-4  rounded-lg shadow `}
                    >
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">
                        {getStateName(parseInt(key))}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {stats[key]} minutes
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="p-4 mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              Détails du sommeil
              <ArrowDown
                onClick={() => {
                  setIsDetailDisplayed(!isDetailDisplayed);
                }}
              />
            </h2>
            {isDetailDisplayed && (
              <div className="w-full table-auto ">
                <div>
                  {sleepData
                    .reduce((acc, data, index, arr) => {
                      if (index === 0 || data.state !== arr[index - 1].state) {
                        acc.push(data);
                      }
                      return acc;
                    }, [])
                    .map((data, index) => (
                      <div
                        key={index}
                        className={`${getColorClass(
                          getStateName(data.state)
                        )} flex justify-between items-center mb-4  rounded-md `}
                      >
                        <p className="px-4 py-2">{data.time}</p>
                        <p className="px-4 py-2">{getStateName(data.state)}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default Night;

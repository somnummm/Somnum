import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchLastNight, fetchAdvice } from "../store/dashboard";
import Loader from "../components/Loader";
import DashboardInfo from "../components/DashboardInfo";
import DashboardAdvice from "../components/DashboardAdvice";
import { loadSleepInfo } from "../store/program.js";

const Dashboard = () => {
  const [lastNight, setLastNight] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [nextNight, setNextNight] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const loadInfo = () => {
    setIsLoading(true);

    Promise.all([
      fetchLastNight(),
      fetchAdvice(),
      loadSleepInfo(new Date().toLocaleDateString()),
    ])
      .then(([lastNightResponse, adviceResponse, nextNightInfo]) => {
        setLastNight(lastNightResponse);
        setAdvice(adviceResponse);
        setNextNight(nextNightInfo);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    loadInfo();
  }, []);
  useEffect(() => {
    loadInfo();
  }, []);
  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-50 ml-4">
          Tableau de bord
        </h2>
        <button
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => {
            navigate("/historic");
          }}
        >
          Historique
        </button>
      </div>
      <DashboardInfo lastNightInfo={lastNight} nextNightInfo={nextNight} />
      <DashboardAdvice advice={advice} className="mb-8" />
    </div>
  );
};
export default Dashboard;

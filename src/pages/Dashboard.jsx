import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchLastNight, fetchAdvice } from "../store/dashboard";
import Loader from "../components/Loader";
import DashboardInfo from "../components/DashboardInfo";
import DashboardAdvice from "../components/DashboardAdvice";
const Dashboard = () => {
  const [lastNight, setlastNight] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const loadInfo = () => {
    setIsLoading(true);

    Promise.all([fetchLastNight(), fetchAdvice()])
      .then(([lastNightResponse, adviceResponse]) => {
        setlastNight(lastNightResponse);
        setAdvice(adviceResponse);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
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
        <h2 className="text-2xl font-bold text-gray-50">Tableau de bord</h2>
        <button
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => {
            navigate("/historic");
          }}
        >
          Historique
        </button>
      </div>
      <DashboardInfo info={lastNight} />
      <DashboardAdvice advice={advice} className="mb-8" />
      {/* <div>
        <p>Todo</p>
        <ul>
          <li>Afficher la durée de la dernière nuit</li>
          <li>Afficher le programme du jour</li>
          <li>Permettre de modifier le programme du jour</li>
          <li>
            lui faire des comparaisons avec des données mondiales de sommeil
          </li>
        </ul>
      </div> */}
    </div>
  );
};
export default Dashboard;

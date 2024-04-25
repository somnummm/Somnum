import { useEffect, useState } from "react";
import { fetchLastNight, fetchAdvice } from "../store/dashboard";
import Loader from "../components/Loader";
import DashboardInfo from "../components/DashboardInfo";
import DashboardAdvice from "../components/DashboardAdvice";
const Dashboard = () => {
  const [lastNight, setlastNight] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <div>
      <h2 className="text-2xl font-bold text-gray-50">Tableau de bord</h2>
      <DashboardInfo info={lastNight} />
      <DashboardAdvice advice={advice} />
      <div>
        <p>Todo</p>
        <ul>
          <li>Afficher la durée de la dernière nuit</li>
          <li>Afficher le programme du jour</li>
          <li>Permettre de modifier le programme du jour</li>
          <li>
            lui faire des comparaisons avec des données mondiales de sommeil
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Dashboard;

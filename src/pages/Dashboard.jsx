import { useEffect, useState } from "react";
import { fetchLastNight } from "../store/dashboard";
import Loader from "../components/Loader";
import DashboardInfo from "../components/DashboardInfo";
const Dashboard = () => {
  const [lastNight, setlastNight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadInfo = () => {
    fetchLastNight().then((response) => {
      setlastNight(response);
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

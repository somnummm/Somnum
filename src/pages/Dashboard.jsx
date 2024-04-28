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
    <div className="pb-10">
      <h2 className="flex text-2xl font-bold text-gray-50 justify-center m-2">Tableau de bord</h2>
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

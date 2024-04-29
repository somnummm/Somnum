import {useEffect, useState} from "react";
import {fetchLastNight, fetchAdvice} from "../store/dashboard";
import Loader from "../components/Loader";
import DashboardInfo from "../components/DashboardInfo";
import DashboardAdvice from "../components/DashboardAdvice";
import PageTitle from "../components/PageTitle.jsx";
import {loadSleepInfo} from "../store/program.js";

const Dashboard = () => {
    const [lastNight, setLastNight] = useState(null);
    const [nextNight, setNextNight] = useState(null);
    const [advice, setAdvice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadInfo = () => {
        setIsLoading(true);

        Promise.all([fetchLastNight(), fetchAdvice(), loadSleepInfo(new Date().toLocaleDateString())])
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
    return isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
            <Loader/>
        </div>
    ) : (
        <div className="pb-10">
            <PageTitle title="Tableau de bord"/>
            <DashboardInfo lastNightInfo={lastNight} nextNightInfo={nextNight}/>
            <DashboardAdvice advice={advice} className="mb-8"/>
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

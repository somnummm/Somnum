import { useEffect, useState } from "react";
import { fetchHistoric } from "../store/historic";
import Loader from "../components/Loader";
import NightCard from "../components/NightCard";

const Historic = () => {
  const [historic, setHistoric] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadInfo = () => {
    fetchHistoric().then((response) => {
      setHistoric(response);
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
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">
          Historique
        </h2>
      </div>
      <div className="w-full max-w-md p-4 sm:p-8 ">
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {historic.map((night, index) => (
              <NightCard key={index} night={night} className="mb-4" />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Historic;

import fetchSleep from "../store/sleep";
import { useEffect, useState } from "react";

const Sleep = () => {
  const userId = 3;
  const [sleep, setSleep] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSleep(userId).then((response) => {
      setSleep(response);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <div>Chargement...</div>
  ) : (
    <div>
      <h1>Sleep</h1>
      <p>UserId: {userId}</p>
      <p>Sleep: {JSON.stringify(sleep)}</p>
    </div>
  );
};

export default Sleep;

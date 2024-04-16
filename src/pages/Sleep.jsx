import fetchSleep from "../store/sleep";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

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
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div>
      <h1>Sleep</h1>
      <p>UserId: {userId}</p>
      <h2>Sleep Data:</h2>
      <ul>
        {sleep.map((entry) => (
          <li key={entry.id}>
            <strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}{" "}
            <br />
            <strong>Sleep Time:</strong>{" "}
            {new Date(entry.sleepTime).toLocaleTimeString()} <br />
            <strong>Wake Time:</strong>{" "}
            {new Date(entry.wakeTime).toLocaleTimeString()} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sleep;

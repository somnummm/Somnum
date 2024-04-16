import fetchSleep from "../store/sleep";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Sleep = () => {
  const userId = 3;
  const [sleep, setSleep] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [daySelected, setDaySelected] = useState(0);
  const [dateSelected, setDateSelected] = useState(
    new Date().toLocaleDateString()
  );

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
      <div className="grid grid-cols-7 gap-2">
        {[...Array(7)].map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() + index);

          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-center ${
                daySelected === index ? "bg-red-500" : ""
              }`}
              onClick={() => {
                setDaySelected(index);
                setDateSelected(date.toLocaleDateString());
              }}
            >
              <div className="text-center">
                {date.toLocaleDateString("fr-FR", { weekday: "short" })}
              </div>
              <div>{date.getDate()}</div>
            </div>
          );
        })}
      </div>
      {(() => {
        const selectedEntry = sleep.find(
          (entry) => new Date(entry.date).toLocaleDateString() === dateSelected
        );
        return (
          selectedEntry && (
            <div>
              <strong>Sleep Time:</strong>
              {new Date(selectedEntry.sleepTime).toLocaleTimeString()} <br />
              <strong>Wake Time:</strong>
              {new Date(selectedEntry.wakeTime).toLocaleTimeString()} <br />
            </div>
          )
        );
      })()}
    </div>
  );
};

export default Sleep;

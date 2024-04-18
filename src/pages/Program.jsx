import { fetchSleep } from "../store/program";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ModalAddProgram from "../components/ModalAddProgram";
import ModalUpdateProgram from "../components/ModalUpdateProgram";

const Program = () => {
  const userId = 3;
  const [sleep, setSleep] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [daySelected, setDaySelected] = useState(0);
  const [dateSelected, setDateSelected] = useState(
    new Date().toLocaleDateString()
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const loadInfo = () => {
    fetchSleep(userId).then((response) => {
      setSleep(response);
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
      <h1>Programme</h1>
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
        return selectedEntry ? (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <strong>Heure de coucher:</strong>
                <p>
                  {new Date(selectedEntry.sleepTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <strong>Heure de réveil:</strong>
                <p>
                  {new Date(selectedEntry.wakeTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <strong>Temps de sommeil:</strong>
              <p>
                {Math.floor(
                  (new Date(selectedEntry.wakeTime) -
                    new Date(selectedEntry.sleepTime)) /
                    1000 /
                    60 /
                    60
                )}{" "}
                heures
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUpdateModalOpen(true);
                }}
              >
                Modifier
              </button>

              {isUpdateModalOpen && (
                <ModalUpdateProgram
                  setIsUpdateModalOpen={setIsUpdateModalOpen}
                  date={dateSelected}
                  entity={selectedEntry}
                  reload={loadInfo}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            {isCreateModalOpen && (
              <ModalAddProgram
                setIsCreateModalOpen={setIsCreateModalOpen}
                date={dateSelected}
                reload={loadInfo}
              />
            )}

            <p>Pas de programme</p>
            <p>{dateSelected}</p>
            <div className="flex justify-center">
              <button
                className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  e.preventDefault();
                  setIsCreateModalOpen(true);
                }}
              >
                Ajouter
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Program;

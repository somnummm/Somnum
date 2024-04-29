import {loadSleepInfo} from "../store/program";
import {useEffect, useState} from "react";
import Loader from "../components/Loader";
import ModalAddProgram from "../components/ModalAddProgram";
import ModalUpdateProgram from "../components/ModalUpdateProgram";
import "../styles/program.css";
import PageTitle from "../components/PageTitle.jsx";

const Program = () => {
    const [sleep, setSleep] = useState([]);
    const [sleepTime, setSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [daySelected, setDaySelected] = useState(0);
    const [dateSelected, setDateSelected] = useState(
        new Date().toLocaleDateString()
    );
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        loadSleepInfo(dateSelected, setSleep, setSleepTime, setWakeTime, setIsLoading);
    }, [dateSelected]);

    return isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
            <Loader/>
        </div>
    ) : (
        <div>
            <PageTitle title="Programme"/>


            <div className="grid grid-cols-7 gap-2 my-4">
                {[...Array(7)].map((_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() + index);

                    return (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center ${
                                daySelected === index
                                    ? "selected-card bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
                                    : ""
                            }`}
                            onClick={() => {
                                setDaySelected(index);
                                setDateSelected(date.toLocaleDateString());
                            }}
                        >
                            <div className="text-center">
                                {date.toLocaleDateString("fr-FR", {weekday: "short"})}
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
                                    {sleepTime}
                                </p>
                            </div>
                            <div>
                                <strong>Heure de réveil:</strong>
                                <p>
                                    {wakeTime}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-4">
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
                        <div className="flex justify-center mt-4">
                            <button
                                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
                                    setSleepTime={setSleepTime}
                                    setWakeTime={setWakeTime}
                                    date={dateSelected}
                                    entity={selectedEntry}
                                    reload={loadSleepInfo}
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
                                reload={loadSleepInfo}
                            />
                        )}

                        <p>Pas de programme</p>
                        <p>{dateSelected}</p>
                        <div className="flex justify-center">
                            <button
                                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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

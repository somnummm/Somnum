const DashboardInfo = ({lastNightInfo, nextNightInfo}) => {
    return (
        <div className="flex flex-col items-center m-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="block  p-6 rounded-lg shadow bg-violet-500">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">
                        Heure de coucher
                    </h5>
                    <p className="font-normal text-white dark:text-white">
                        {lastNightInfo[0]?.sleep_time ? lastNightInfo[0].sleep_time : "Pas de données"}
                    </p>
                </div>

                <div className="block  p-6 rounded-lg shadow bg-blue-400">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">
                        Heure de réveil
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-white">
                        {lastNightInfo[0]?.wake_time ? lastNightInfo[0].wake_time : "Pas de données"}
                    </p>
                </div>

                <div className="block  p-6 rounded-lg shadow bg-fuchsia-500">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">
                        Durée du sommeil
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-white">
                        {lastNightInfo[0]?.sleep_duration ? lastNightInfo[0].sleep_duration : "Pas de données"}
                    </p>
                </div>
                <div className="block  p-6 rounded-lg shadow bg-amber-400">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">
                        Nuit à suivre
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-white">
                        {nextNightInfo?.sleepTime && nextNightInfo?.wakeTime ? `${nextNightInfo.sleepTime} -> ${nextNightInfo.wakeTime}` : "Pas de données"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardInfo;

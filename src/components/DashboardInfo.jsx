const DashboardInfo = ({ info }) => {
  return (
    <div className="flex flex-col items-center m-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="block  p-6 rounded-lg shadow bg-violet-500">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">
            Heure de coucher
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {info[0].sleep_time}
          </p>
        </div>

        <div className="block  p-6 rounded-lg shadow bg-blue-400">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">
            Heure de réveil
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {info[0].wake_time}
          </p>
        </div>

        <div className="block  p-6 rounded-lg shadow bg-fuchsia-500">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">
            Durée du sommeil
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">oui</p>
        </div>
        <div className="block  p-6 rounded-lg shadow bg-amber-400">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white ">
            valeur 1
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            valeur 2
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardInfo;

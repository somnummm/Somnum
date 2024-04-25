const DashboardAdvice = ({ advice }) => {
  //prend 1 éléments au hasard dans le tableau advice
  advice = advice.sort(() => Math.random() - Math.random()).slice(0, 1);
  return (
    <div>
      {advice.map((advice) => (
        <div key={advice.id} className="flex flex-col items-center m-4">
          {/* <h2>{advice.title}</h2>
          <p>{advice.description}</p> */}

          <div className="max-w-sm bg-violet-500 rounded-lg shadow">
            <a href="#">
              <img className="rounded-t-lg" src={advice.url} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-50 ">
                  {advice.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-100 ">
                {advice.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardAdvice;

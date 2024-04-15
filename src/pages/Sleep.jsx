import { useAtom } from "jotai";
import { token } from "../store/auth";
import { fetchSleep } from "../store/sleep";
import { useEffect, useState } from "react";

const Sleep = () => {
  const [tokenStore] = useAtom(token);
  const userId = 3;
  const [sleep, setSleep] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function fetchData() {
    setIsLoading(true);
    return fetch("https://api-gray-chi.vercel.app/program/3", {
      headers: {
        Authorization: `Bearer ${tokenStore}`,
      },
    })
      .then((response) => response.json())
      .then(setSleep)
      .then(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Sleep</h1>
      <p>Token: {tokenStore}</p>
      <p>UserId: {userId}</p>
      <p>Sleep: {JSON.stringify(sleep)}</p>
    </div>
  );
};

export default Sleep;

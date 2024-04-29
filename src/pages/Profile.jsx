import { useState, useEffect } from "react";
import "../styles/profile.css";
import fetchUserInfo from "../store/profile";
import Loader from "../components/Loader";
import { supabase } from "../supabaseClient.js";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo().then((response) => {
      setUser(response);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <>
      <div className="container">
          <PageTitle title={`Bienvenue ${user.firstName} ${user.lastName}`} />
      </div>
      <div className="infos">
        <ul>
          <li className="block">{user.age} ans</li>
          <li className="block"> {user.profilSommeil}</li>
          <li className="block">{user.job}</li>
        </ul>
      </div>
      <div className="contact">
        <ul>
          <h1 className="contactTitle">Vos coordonnées : </h1>
          <li className="mail">{user.email}</li>
        </ul>
      </div>
      <div className="flex items-center justify-center ">
        <button
          type="submit"
          // className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate("/login");
          }}
        >
          Se déconnecter
        </button>
      </div>
      {/* <h1 className="programChosen">Vous avez choisi le programme suivant :</h1>
      <div className="blocInfos">
        <h2 className="pageInfosParagraphe">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum
        </h2>
      </div> */}
    </>
  );
};

export default Profile;

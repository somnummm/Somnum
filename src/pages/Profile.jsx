import { useState, useEffect } from "react";
import "../Profile.css";
import "../App.css"
import fetchUserInfo from "../store/profile";
import Loader from "../components/Loader";
import Citation from "../components/citation";

const Profile = () => {
  const userId = 3;  
  const [user,setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo(userId).then((response) => {
      setUser(response);
      setIsLoading(false);
    })
  }, []);
  //console.log(user);


  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader/>
    </div>
  ) : (
    <>
      <div className="container">
        <h1 className=" shadow-2xl rounded-lg text-center text-2.5xl leading-relaxed overflow-wrap-break m-2">
          Bienvenue {user.firstName} {user.lastName}
        </h1>
      </div>
      <div className="infos">
        <ul>
          <li className="block">{user.age} ans</li>
          <li className="block"> {user.profilSommeil}</li>
          <li className="block">{user.Job}</li>
        </ul>
      </div>
      <div className=" justify-start leading-6 pb-14 mx-4">
        <ul className="border border-solid border-white rounded-lg pl-2 mr-16 shadow-md">
          <h1 className="contactTitle">Vos coordonnées : </h1>  
          <li className="mail">{user.email}</li>
        </ul>
      </div>
      <div className='relative border border-solid border-purple-900 rounded-lg p-2 mx-4 shadow-xl'>
      <div className="absolute top-0 left-0 w-full h-full bg-violet-400 opacity-70 rounded-lg"></div>
      <div className="relative z-10 text-white">
      <h1 className=''>Vous avez choisi le programme suivant :</h1>
      <div className="blocInfos">
        <h2 className="pageInfosParagraphe">
          Vous avez choisi tel programme de sommeil alors vous devez aller vous 
          coucher à X heure afin d'avoir vos Y heures de sommeil. 
          <br/><br/>
          Votre programme de sommeil a défini l'heure à laquelle vous devez 
          aller vous coucher en vous alertant 30 mins avant.
        </h2>
      </div>
      </div>
      </div>
      <div className="border border-solid border-gray-300 rounded-lg p-4 mt-4 mx-4 pl-10 bg-white opacity-70 text-black">
        <Citation/>
      </div>
    </>
  );
}

export default Profile;

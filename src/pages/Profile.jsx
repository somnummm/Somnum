import { useState, useEffect } from "react";
import "../Profile.css";
import "../App.css";
//import utilisateurs from "../mocks/user.json";
import fetchUserInfo from "../store/profile";

const Profile = () => {
  const userId = 3; // userId de clément
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo(userId).then((response) => {
      setUser(response);
      setIsLoading(false);
    });
  }, []);
  //console.log(user);

  return isLoading ? (
    <div>Chargement...</div>
  ) : (
    <>
      <div className="container">
        <h1 className="titre">
          Bienvenue {user.firstName} {user.lastName}
        </h1>
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
      <h1 className="programChosen">Vous avez choisi le programme suivant :</h1>
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
      </div>
    </>
  );
};

export default Profile;

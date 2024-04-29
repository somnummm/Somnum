import {useState, useEffect} from "react";
import "../styles/profile.css";
import "../App.css"
import fetchUserInfo from "../store/profile";
import Loader from "../components/Loader";
import Citation from "../components/citation";
import PageTitle from "../components/PageTitle.jsx";
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabaseClient.js";
import {fetchSleep, loadSleepInfo} from "../store/program.js";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [sleep, setSleep] = useState([]);
    const [sleepTime, setSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        loadSleepInfo(new Date().toLocaleDateString(), setSleep, setSleepTime, setWakeTime, setIsLoading);
        fetchUserInfo().then((response) => {
            setUser(response);
            setIsLoading(false);
        });
    }, []);

    return isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
            <Loader/>
        </div>
    ) : (
        <>
            <div className="container">
                <PageTitle title={`Bienvenue ${user.firstName} ${user.lastName}`}/>
            </div>
            <div className="infos">
                <ul>
                    <li className="block">{user.age} ans</li>
                    <li className="block">{user.job}</li>
                </ul>
            </div>
            <div className="justify-start leading-6 pb-14 mx-4">
                <ul className="border border-solid border-white rounded-lg pl-2 mr-16 shadow-md">
                    <h1 className="contactTitle">Vos coordonnées : </h1>
                    <li className="mail">{user.email}</li>
                </ul>
            </div>
            <div className='relative border border-solid border-purple-900 rounded-lg p-2 mx-4 shadow-xl'>
                <div className="absolute top-0 left-0 w-full h-full bg-violet-400 opacity-70 rounded-lg"></div>
                <div className="relative z-10 text-white">
                    <h1 className='text-center'>Votre programme du jour</h1>
                    <br/>
                    <div className="blocInfos">
                        <p className="pageInfosParagraphe">
                            Ce soir, vous devez vous coucher à <p
                            className="text-red-500 inline">{sleepTime}</p> pour
                            vous réveiller demain à <span className="text-red-500 inline">{wakeTime}</span>.
                            <br/><br/>
                            Votre programme de sommeil a défini l'heure à laquelle vous devez
                            aller vous coucher en vous alertant 30 mins avant.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="border border-solid border-gray-300 rounded-lg p-4 mt-4 mx-4 pl-10 bg-white opacity-70 text-black">
                <Citation/>
            </div>
            <div className="flex items-center justify-center pt-10">
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
        </>
    );
}

export default Profile;

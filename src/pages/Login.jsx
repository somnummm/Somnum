import {auth} from "../store/auth";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthInput from "../components/AuthInput.jsx";
import {unAuthGuard} from "../guards/authGuard.js";
import MoonIcon from "../assets/icons/moon.jsx";

const Login = () => {
    let navigate = useNavigate();
    useEffect(() => {
        unAuthGuard(navigate);
    }, [navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center">
                    <MoonIcon className="mx-auto h-20 w-auto"/>
                </div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-50">
                    Se connecter
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <AuthInput
                        fieldSetter={setEmail}
                        type={"email"}
                        labelName={"Adresse mail"}
                        id={"email"}
                    />
                    <AuthInput
                        fieldSetter={setPassword}
                        type={"password"}
                        labelName={"Mot de passe"}
                        id={"email"}
                        // xp
                        additionalBlockLink={"#"}
                    />
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={async (e) => {
                            e.preventDefault();
                            try {
                                setError(false);
                                await auth(email, password).then(() => navigate("/"))
                            } catch (error) {
                                setError(true);
                            }
                        }}
                    >
                        Se connecter
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-gray-50">
                    Pas encore membre?{" "}
                    <a
                        href="/register"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Inscris-toi!
                    </a>
                </p>
                {error && (<p className="text-center m-5 text-red-500">Email ou mot de passe incorrect</p>)}
            </div>
        </div>
    );
};

export default Login;

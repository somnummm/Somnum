import {auth} from "../store/auth";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthInput from "../components/AuthInput.jsx";
import {authGuard, unAuthGuard} from "../guards/authGuard.js";

const Login = () => {
    let navigate = useNavigate();
    useEffect(() => {
        unAuthGuard(navigate);
    }, [navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-50">
                    Se connecter
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <AuthInput fieldSetter={setEmail} type={"email"} labelName={"Adresse mail"} id={"email"}/>
                    <AuthInput fieldSetter={setPassword} type={"password"} labelName={"Mot de passe"} id={"email"}
                               additionalBlock={"Mot de passe oublié?"} additionalBlockLink={"#"}/>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={(e) => {
                            e.preventDefault();
                            auth(email, password).then(r => navigate("/dashboard"));
                        }}
                    >
                        Se connecter
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-gray-500">
                    Pas encore membre?{" "}
                    <a
                        href="/register"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Inscris-toi!
                    </a>
                </p>
            </div>
        </div>
    )
        ;
};

export default Login;

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthInput from "../components/AuthInput.jsx";
import {register} from "../store/register.js"
import {unAuthGuard} from "../guards/authGuard.js";

const SignUp = () => {
        let navigate = useNavigate();
        useEffect(() => {
            unAuthGuard(navigate);
        }, [navigate]);
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [age, setAge] = useState("");
        const [job, setJob] = useState("");

        return (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-50">
                        S'inscrire
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">

                        <AuthInput field={email} fieldSetter={setEmail} labelName={"Adresse mail"} id="email"
                                   type={"email"}/>
                        <AuthInput field={password} fieldSetter={setPassword} labelName="Mot de passe" id={"password"}
                                   type={"password"}/>
                        <AuthInput field={firstName} fieldSetter={setFirstName} labelName={"Prénom"} id={"firstName"}
                                   type={"text"}/>
                        <AuthInput field={lastName} fieldSetter={setLastName} labelName={"Nom"} id={"lastName"}
                                   type={"text"}/>
                        <AuthInput field={age} fieldSetter={setAge} labelName={"Age"} id={"age"}
                                   type={"number"}/>
                        <AuthInput field={job} fieldSetter={setJob} labelName={"Job"} id={"job"}
                                   type={"text"}/>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={(e) => {
                                    if (email && password && firstName && lastName && age && job) {
                                        e.preventDefault();
                                        register(email, password, firstName, lastName, age, job)
                                            .then(r => navigate("/dashboard"));
                                    } else {
                                        return false;
                                    }
                                }}
                            >
                                S'inscrire
                            </button>
                            <p className="mt-5 text-center text-sm text-gray-500">
                                Déjà membre?{" "}
                                <a
                                    href="/login"
                                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                >
                                    Connecte-toi!
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        )
            ;
    }
;

export default SignUp;

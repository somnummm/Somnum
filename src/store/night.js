//il faut générer un objet {time: 0, duration: 60, state: 0} pour chaque tranche de sommeil
import {supabase} from "../supabaseClient.js";

const generateSleepData = async () => {
    const {
        data: {user},
    } = await supabase.auth.getUser();
    const sleepData = [];
    let currentTime = 1320; //22h en minutes

    const timeElapsed = (start, end) => {
        const startTime = new Date();
        startTime.setHours(parseInt(start.slice(0, 2)), parseInt(start.slice(3, 5)));
        const endTime = new Date();
        endTime.setHours(parseInt(end.slice(0, 2)), parseInt(end.slice(3, 5)));

        const timeDiff = new Date(endTime - startTime);
        const minutes = timeDiff.getMinutes();
        const hours = timeDiff.getHours() - 1;

        console.log(timeDiff, hours, minutes);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    //génère un nombre de minutes de sommeil aléatoire entre 8 et 10h (480 et 600 minutes)
    //const sleepDuration = Math.floor(Math.random() * 120) + 480;

    const inter = 10;
    const sleepStates = ["deep", "core", "rem", "awake"];
    const transitions = {
        deep: ["core", "rem", "awake"],
        core: ["deep", "rem"],
        rem: ["core"],
        awake: ["core"],
    };

    let currentState = "deep"; // Commencez par l'état "deep"

    for (let i = 0; i < inter; i++) {
        const possibleStates = transitions[currentState];
        const state =
            possibleStates[Math.floor(Math.random() * possibleStates.length)];
        const duration = Math.floor(Math.random() * 31) + 30; // Durée aléatoire entre 30 et 60 minutes
        const hours = Math.floor(Math.round(currentTime / 60)) % 24;
        const minutes = Math.round(currentTime) % 60;
        const time = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;

        sleepData.push({
            time: time,
            duration: duration,
            state: sleepStates.indexOf(state),
        });

        currentTime += duration;
        currentState = state;
    }
    //ajoute un état d'éveil au début et à la fin
    sleepData[0].state = 3;
    sleepData[sleepData.length - 1].state = 3;

    await supabase.from("Night").insert([
        {
            userId: user.id,
            sleep_time: sleepData[0].time,
            sleep_duration:timeElapsed(sleepData[0].time, sleepData[sleepData.length - 1].time),
            wake_time: sleepData[sleepData.length - 1].time,
        },
    ]);
    return sleepData;
};
export default generateSleepData;

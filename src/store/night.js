//il faut générer un objet {time: 0, duration: 60, state: 0} pour chaque tranche de sommeil
const generateSleepData = async () => {
  const sleepData = [];
  let currentTime = 1320; //22h en minutes

  //génère un nombre de minutes de sommeil aléatoire entre 8 et 10h (480 et 600 minutes)
  const sleepDuration = Math.floor(Math.random() * 120) + 480;
  console.log("Sleep duration", sleepDuration / 60, "hours");

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

  return sleepData;
};
export default generateSleepData;

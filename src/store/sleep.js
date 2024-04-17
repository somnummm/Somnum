import { supabase } from "../supabaseClient";

const fetchSleep = async (userId) => {
  let { data: SleepProgram, error } = await supabase
    .from("SleepProgram")
    .select("*");
  if (error) console.log("error", error);

  return SleepProgram;
};

const insertSleepProgram = async (userId, date, duration) => {
  let { data, error } = await supabase
    .from("SleepProgram")
    .insert([{ userId, date, duration }]);
  if (error) console.log("error", error);

  return data;
};

export { fetchSleep, insertSleepProgram };


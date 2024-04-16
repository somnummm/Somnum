import { supabase } from "../supabaseClient";

const fetchSleep = async (userId) => {
  // const data = await api().get(`/program/${userId}`);
  // return data;
  console.log(userId);

  let { data: SleepProgram, error } = await supabase
    .from("SleepProgram")
    .select("*");
  if (error) console.log("error", error);

  return SleepProgram;
};

export default fetchSleep;

import { supabase } from "../supabaseClient";

const fetchLastNight = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  //récupère la dernière nuit de l'utilisateur

  let { data: Night, error } = await supabase
    .from("Night")
    .select("*")
    .eq("userId", user.id)
    .order("created_at", { ascending: false })
    .limit(1);
  if (error) console.log("error", error);
  return Night;
};

const fetchAdvice = async () => {
  let { data: Advice, error } = await supabase.from("Advice").select("*");
  if (error) console.log("error", error);
  return Advice;
};

export { fetchLastNight, fetchAdvice };

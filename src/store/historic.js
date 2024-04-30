import { supabase } from "../supabaseClient";

const fetchHistoric = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  //récupère la dernière nuit de l'utilisateur

  let { data: Night, error } = await supabase
    .from("Night")
    .select("*")
    .eq("userId", user.id)
    .order("created_at", { ascending: false });
  if (error) console.log("error", error);
  return Night;
};

export { fetchHistoric };

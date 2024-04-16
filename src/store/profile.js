import { supabase } from "../supabaseClient";

//custom hook to fetch sleep data
const fetchUserInfo = async (userId) => {
  //const tokenStore = localStorage.getItem("token") || "";
  // const data = await api(tokenStore).get(`/user/${userId}`);
  // return data;

  let { data: User } = await supabase.from("User").select("*").eq("id", userId);
  return User[0];
};

export default fetchUserInfo;

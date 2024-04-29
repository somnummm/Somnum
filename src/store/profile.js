import {supabase} from "../supabaseClient";

//custom hook to fetch sleep data
const fetchUserInfo = async (userId) => {
    //const tokenStore = localStorage.getItem("token") || "";
    // const data = await api(tokenStore).get(`/user/${userId}`);
    // return data;

    return (await supabase.auth.getUser()).data.user.user_metadata;
};

export default fetchUserInfo;

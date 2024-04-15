import { useAtom } from "jotai";
import { token } from "../store/auth";
const Sleep = () => {
  const tokenStore = useAtom(token);
  return (
    <div>
      <h1>Sleep</h1>
      <p>Token: {tokenStore}</p>
    </div>
  );
};

export default Sleep;

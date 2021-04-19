import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/Auth";

const useSignIn = () => {
  const endpoint = `/api/auth/signIn`;
  // const { setUser } = useContext(AuthContext);

  const signIn = async (username, password) => {
    const { data } = await axios.post(endpoint, { username, password });
    // console.log(1, data);
    // setUser(data);
    return data;
  };

  return {
    signIn,
  };
};

export default useSignIn;

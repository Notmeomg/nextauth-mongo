import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const useSignIn = (username, password) => {
  const endpoint = `/api/auth/signin`;
  const { data, error } = useSWR(endpoint, fetcher);
  return {
    data,
    error,
  };
};

export default useSignIn;

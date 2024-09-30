import useSWRImmutable from "swr/immutable";
import { fetcher } from "../api/apiHelper";

function usePopularArticles() {
  const apiURL = process.env.REACT_APP_API_URL;
  const APP_TOKEN = process.env.REACT_APP_TOKEN;

  const { data, error } = useSWRImmutable(
    `${apiURL}/7.json?api-key=${APP_TOKEN}`,
    fetcher
  );

  return { data, error };
}

export default usePopularArticles;

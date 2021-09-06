import { useEffect, useState } from "react";
import queryString from "query-string";

const useParams = ({ search }) => {
  const [params, setParams] = useState("");

  useEffect(() => {
    const params = queryString.parse(search);
    setParams(params);
  }, [search]);

  return params;
};

export default useParams;

import { useEffect, useState } from "react";
import queryString from "query-string";

const useParams = (location) => {
  const [params, setParams] = useState("");
  const [search] = useState(location?.search || window?.location?.search);

  useEffect(() => {
    const params = queryString.parse(search);
    setParams(params);
  }, [search]);

  return params;
};

export default useParams;

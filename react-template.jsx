import { useEffect, useState } from "react";

const useA = () => {
  const [a, setA] = useState();

  useEffect(() => {
    setA();
  }, []);

  return a;
};

export default useA;

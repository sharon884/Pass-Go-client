import { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () =>  savedCallback.current();
     const id = setInterval(tick, delay);
      return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;

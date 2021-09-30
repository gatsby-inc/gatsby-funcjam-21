import { useEffect, useState } from "react";

const useSessionStorage = (key) => {
  let initialValue = undefined;

  try {
    initialValue = sessionStorage.getItem(key);
  } catch (error) {
    initialValue = null;
    console.warn("useSessionStorage", error);
  }

  const [persistedValue, setPersistedValue] = useState(
    initialValue && JSON.parse(initialValue)
  );

  useEffect(() => {
    window.addEventListener("storage", function (e) {
      alert("change");
      // else, event is caused by an update to localStorage, ignore it
    });
  }, []);

  const setValue = (newValue) => {
    setPersistedValue(newValue);
    try {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn("useSessionStorage", error);
    }
  };

  return [persistedValue, setValue];
};

export default useSessionStorage;

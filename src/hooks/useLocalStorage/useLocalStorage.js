import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(()=>{
    if (!localStorage.getItem(key)) {
      return initialValue
    } else {
      return localStorage.getItem(key)
    }
  });

  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };
  return [storedValue, setValue];
}

export { useLocalStorage };

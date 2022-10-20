import { useState } from "react";

function useLocalStorage(key:string, initialValue:string) {
  const [storedValue, setStoredValue] = useState(()=>{
    if (!localStorage.getItem(key)) {
      return initialValue
    } else {
      return localStorage.getItem(key)
    }
  });

  const setValue = (value: string) => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };
  return [storedValue, setValue];
}

export { useLocalStorage };

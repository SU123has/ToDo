import { useState } from "react";

/**
 * @param {string} key - The key under which the value is a stored in localStorage
 * @param {T} initialValue - The initial value to use if nothing is found in localStorage
 * @returns {{data: T, updatedData: (updatedData: T)=>void}} - An object containing the current value and a function to update it
 */

export default function useLocalStorage(key, initialValue) {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const initialData = JSON.parse(storedData);
      return initialData;
    } else {
      const intialData = initialValue;
      localStorage.setItem(key, JSON.stringify(intialData));
    }
  });

  const updateData = (updatedData) => {
    setData(updatedData);
    localStorage.setItem(key, JSON.stringify(updatedData));
  };

  return { data, updateData };
}

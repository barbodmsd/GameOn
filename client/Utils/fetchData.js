'use client'
import { useEffect } from "react";

const fetchData = (url, option = {}) => {
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(import.meta.env.API_URL+url, option);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
};

export default fetchData;

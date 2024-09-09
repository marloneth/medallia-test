import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import React from "react";
import axios from "axios";

const url = "https://swapi.dev/api/people/";
function People() {
  const [data, setData] = useState([]);
  // const { data, isLoading, error } = useFetch("https://swapi.dev/api/people/");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(url);
        const data = result.data.results || [];
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((person) => {
        <span>{person.name}</span>;
      })}
    </div>
  );
}

export default People;

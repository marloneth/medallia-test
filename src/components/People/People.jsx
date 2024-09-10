import useFetch from "../../hooks/useFetch";
import React, { useEffect, useState } from "react";
import PeopleList from "../PeopleList/PeopleList";
import "./People.css";

export default function People() {
  const [males, setMales] = useState([]);
  const [females, setFemales] = useState([]);
  const [mixed, setMixed] = useState(false);
  const { data, isLoading, error } = useFetch("https://swapi.dev/api/people/");

  const handleButtonClick = () => {
    setMixed(!mixed);
  };

  useEffect(() => {
    const peopleByGender = new Map();

    for (const person of data) {
      const currentGenderPeople = peopleByGender.get(person.gender);
      if (currentGenderPeople) {
        peopleByGender.set(person.gender, [...currentGenderPeople, person]);
      } else {
        peopleByGender.set(person.gender, [person]);
      }
    }

    setMales(peopleByGender.get("male") || []);
    setFemales(peopleByGender.get("female") || []);
  }, [data]);

  return (
    <main>
      <h1>People</h1>
      {isLoading ? <p>Loading ...</p> : null}
      {error ? <p className="error-message">{error}</p> : null}
      {data.length && !isLoading && !error ? (
        <>
          <div className="container">
            {mixed ? (
              <PeopleList
                title="Mixed"
                itemKey="mixed-item"
                items={[...males, ...females].sort((a, b) =>
                  a.name.localeCompare(b.name)
                )}
              />
            ) : (
              <>
                <PeopleList title="Male" itemKey="male-item" items={males} />
                <PeopleList
                  title="Female"
                  itemKey="female-item"
                  items={females}
                />
              </>
            )}
          </div>
          {!mixed ? (
            <button onClick={handleButtonClick} className="merge-button">
              Mix & Sort
            </button>
          ) : null}
        </>
      ) : null}
    </main>
  );
}

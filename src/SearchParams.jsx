import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg-gray-200 bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={e => { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj  = {
          animal: formData.get("animal") || "",
          breed: formData.get("breed") || "",
          location: formData.get("location") || "",
        };
        setRequestParams(obj);
      }}
      >

        <label htmlFor="location">
          Location 
          <input
            type="text"
            name="location"
            id="location"
            className="search-input"
            placeholder="Location"
          />

        </label>

        <label htmlFor="animal">
          Animal
          <select
            className="search-input"
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >

        <option />
        {ANIMALS.map((animal) => (
          <option key={animal} value={animal}>{animal}</option>
        ))}
      </select>
      </ label>
        

      <label htmlFor="breed">
          Breed
          <select  className="search-input grayed-out-disabled" disabled={!breeds.length} id="breed" name="breed">
      <option />
            {breeds.map((breed) => (
        <option key={breed} value={breed}>
          {breed}
        </option>
      ))}
          </select>
      </label>

        <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none border-none bg-orange-500">Submit</button>
      </form>
      <Results pets={pets} />
         </div>
  ); 
};

export default SearchParams;





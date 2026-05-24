import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";
import "./index.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const countriesList =
    search === ""
      ? countries
      : countries.filter((countrie) =>
          countrie.name.common.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <>
      <Filter search={search} onChange={handleSearch} />
      <CountriesList countriesList={countriesList} />
    </>
  );
};

export default App;

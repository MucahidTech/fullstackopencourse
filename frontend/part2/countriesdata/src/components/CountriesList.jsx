import Country from "./Country";

const CountriesList = ({ countriesList, onShowCountry }) => {
  if (countriesList.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countriesList.length === 1) {
    return <Country country={countriesList[0]} />;
  }

  return (
    <ul>
      {countriesList.map((country) => (
        <li key={country.cca3}>
          <span>{country.name.common}</span>
          <button onClick={() => onShowCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;

import Country from "./Country";

const CountriesList = ({ countriesList }) => {
  // const syria = {
  //   name: { common: "Syria", official: "Syrian Arab Republic" },
  //   capital: "Damascus",
  //   area: 185180,
  //   region: "Asia",
  //   population: 23000000,
  //   timezones: ["UTC+03:00"],
  //   languages: ["Arabic"],
  //   flags: {
  //     svg: "https://flagcdn.com/sy.svg",
  //     alt: "The flag of Syria features three equal horizontal bands of red, white, and black, with two green five-pointed stars centered in the white band.",
  //   },
  // };

  if (countriesList.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countriesList.length === 1) {
    return <Country country={countriesList[0]} />;
  }

  return (
    <ul>
      {countriesList.map((country) => (
        <li key={country.cca3}>{country.name.common}</li>
      ))}
    </ul>
  );
};

export default CountriesList;

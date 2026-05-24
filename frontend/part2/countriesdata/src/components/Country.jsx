const Country = ({ country }) => {
  const languages = Object.values(country.languages);

  return (
    <>
      <h1> {country.name.common}</h1>
      <h3>{country.name.official}</h3>
      <p>
        Capital: <strong>{country.capital}</strong>
      </p>
      <p>Area: "{country.area}" km2</p>
      <p>Region: {country.region}</p>
      <p>Population: {country.population}</p>
      <p>Timezone: {country.timezones[0]}</p>

      <h2>Languages:</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang}> {lang} </li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        className="flagPic"
      />
    </>
  );
};

export default Country;

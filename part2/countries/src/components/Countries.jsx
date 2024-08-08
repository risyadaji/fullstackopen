const Weather = ({ weather }) => {
  return (
    <>
      <h1>Weather in {weather.name}</h1>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={weather.iconUrl} />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}
const Country = ({ country, weather }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>

      <h2>languages:</h2>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      {weather ? <Weather weather={weather} /> : ''}
    </>
  )
}

const Countries = ({ countries, weather, onShow }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length == 1) {
    return <Country country={countries[0]} weather={weather} />
  }

  return countries.map((country, i) => (
    <div key={i}>
      {country.name.common}{' '}
      <button onClick={() => onShow(country.name.common)}>show</button>
    </div>
  ))
}

export default Countries

import { useEffect, useState } from 'react'

import countriesService from './service/countries'
import weatherService from './service/weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const { latlng } = country
    weatherService.getWeather(latlng[0], latlng[1]).then((weather) => {
      setWeather(weather)
    })
  }, [])

  if (!weather) {
    return null
  }

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

      <h2>Weather in {weather.name}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={weather.iconUrl} />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

const CountryList = ({ countries, onShow }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length == 1) {
    return <Country country={countries[0]} />
  }

  return countries.map((country, i) => (
    <div key={i}>
      {country.name.common}{' '}
      <button onClick={() => onShow(country.name.common)}>show</button>
    </div>
  ))
}

function App() {
  const [findCountry, setFindCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService.getAll().then((countries) => setCountries(countries))
  }, [])

  // Will be updated after re-render (invoke setX function)
  const matchedCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(findCountry.toLowerCase())
  )

  return (
    <>
      <div>
        find countries{' '}
        <input
          value={findCountry}
          onChange={(e) => setFindCountry(e.target.value)}
        />
      </div>
      <CountryList countries={matchedCountries} onShow={setFindCountry} />
    </>
  )
}

export default App

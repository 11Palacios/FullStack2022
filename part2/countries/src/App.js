import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const url = 'https://restcountries.com/v3.1/all';
  const [countries, setCountries] = useState(null)
  const [filtered, setFiltered] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get(url).then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilter = (e) => {
    if(countries){
      let filter = countries.filter(c => c.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
        setFiltered(filter)
    }
  }

  const show = (country) => {
    let filter = filtered.filter(c => c.name.common.toLowerCase() === country.toLowerCase())
    setFiltered(filter)
  }

if(filtered && filtered.length === 1){
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: {q: filtered[0].capital[0]},
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_WEATHER_API,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    setWeather(response.data.current)
  }).catch(function (error) {
    console.error(error);
  });
}
  
  return (
    <div className="App">
      find countries <input onChange={handleFilter}/>
      {countries ? 
        filtered && filtered.length > 10 ? 
          <p>Too many matches, specify another filter</p> : 
            <>
              {filtered ? 
                filtered.length === 1 ? 
                  <div>
                    <h1>{filtered[0].name.common}</h1>
                    <p>capital {filtered[0].capital[0]}</p>
                    <p>population {filtered[0].population}</p>
                    <h2>languages</h2>
                    <ul>
                      {Object.keys(filtered[0].languages).map(k => <li key={k}>{filtered[0].languages[k]}</li>)}
                    </ul>
                    <img src={filtered[0].flags.png} alt={`flag of ${filtered[0].name.common}`} width='125px'></img>
                    {weather ? 
                    <><h2>Weather in {filtered[0].capital[0]}</h2>
                    <p><b>temperature:</b> {weather.temp_c} Celsius</p>
                    <img src={weather.condition.icon} alt={weather.condition.text}></img>
                    <p><b>wind:</b> {weather.wind_kph} kph direction {weather.wind_dir}</p>
                    </>
                  :<></>}
                    
                  </div> :
                    filtered.map(f => <p key={f.name.common}><span>{f.name.common} </span><button onClick={() => show(f.name.common)}>show</button></p>) 
                      : <></>}
            </> : 
              <p>Retrieving info</p>}
      
    </div>
  );
}

export default App;

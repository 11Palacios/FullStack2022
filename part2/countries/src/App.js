import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const url = 'https://restcountries.com/v3.1/all';
  const [countries, setCountries] = useState(null)
  const [filtered, setFiltered] = useState(null)

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
                  </div> :
                    filtered.map(f => <p key={f.name.common}>{f.name.common}</p>) 
                      : <></>}
            </> : 
              <p>Retrieving info</p>}
      
    </div>
  );
}

export default App;

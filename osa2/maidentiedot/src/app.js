import React, { useState, useEffect } from 'react'
import countriesService from './services/countries'


const Find = (props) => {
    return (
        <div>
            <p>
                find countries 
                <input 
                    value={props.newSearch} 
                    onChange={props.handleCountryChange} 
                    placeholder="type a country" >
                </input></p>
        </div>
    )
}

const Result = (props) => {
    return (
        <div>
            <p>{props.countryName} </p>
        </div>
    )
}

const OneCountry = (props) => {
    const languagesMapped = () => props.countryLanguages.map(language =>
        <Languages 
            key={language.name}
            languageName={language.name}
        />
        )
    return (
        <div>
            <h1>{props.countryName}</h1>
            <p>Capital: {props.countryCapital}</p>
            <p>Population: {props.countryPopulation}</p>
            <h2>Languages</h2>
            {languagesMapped()}
            <img src={props.countryImage} alt="countryflag"/>
        </div>
    )
}

const Languages = (props) => {
    return <li>{props.languageName}</li>
}

const App = () => {
    const [ newSearch, setNewSearch ] = useState('')
    const [ countries, setCountries ] = useState([])

    useEffect(() => {
        countriesService
            .getAll()
            .then(response => {
                setCountries(response)
            })
    }, [])

    const handleCountryChange = (event) => {
        setNewSearch(event.target.value)
    }

    const rows = () => {
        const results = countries.filter(country => country.name.toLowerCase().includes(newSearch))
        if (results.length <= 10 && results.length > 1) {
            const filtered = () => results.map(country => 
                <Result key={country.name} 
                    countryName={country.name}
                /> 
                )
            return filtered()
        } else if (results.length === 1) {
            const oneResult = () => results.map(country =>
                <OneCountry 
                key={country.name}
                countryName={country.name}
                countryCapital={country.capital}
                countryPopulation={country.population}
                countryLanguages={country.languages}
                countryImage={country.flag}
                />
            )
            return oneResult()            
        } else {
            return <p>Too many matches. Specify your search</p>
        }
    }
    return (
        <div>
            <Find handleCountryChange={handleCountryChange} newSearch={newSearch} /> 
            {rows()}
        </div>
    )
}

export default App
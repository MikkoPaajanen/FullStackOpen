import React, { useState, useEffect } from 'react';
import personService from './services/persons'


const Person = (props) => {
    return (
        <tbody>
            <tr>
                <td>{props.person}</td>
                <td>{props.number}</td>
                <td><button onClick={props.removeName}>Delete</button></td>
            </tr>
        </tbody>
    )
}

const Form = (props) => {
    return (
    <form onSubmit={props.addPerson}>
        <div>
            Name: <input 
            value={props.newName} 
            onChange={props.handleNameChange}
            />
        </div>
        <div>
            Number: <input 
            value={props.newNumber}
            onChange={props.handleNumberChange}
            />
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
    )
}

const Filter = (props) => {
    return (
        <div> 
            Filter shown with: <input type="text" value={props.nameExists} onChange={props.handleFilter}/>
        </div>
    )
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="succesful">{message}</div>
    )
}

const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="error">{message}</div>
    )
}

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ nameExists, setNameExists ] = useState('')
    const [ succesfulMessage, setSuccesfulMessage ] = useState(null)
    const [ errorMessage, setErrorMessage ] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if(persons.find( person => person.name === newName)){
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                const personUpdate = persons.find( person => person.name === newName)
                const changedNumber = {...personUpdate, number: newNumber}
                personService
                    .update(personUpdate.id, changedNumber)
                    .then(returnedNumber => {
                        setPersons(persons.map(person => person.id !== personUpdate.id ? person : returnedNumber))
                        setNewName('')
                        setNewNumber('')
                        setSuccesfulMessage(
                            `Added new number for ${personUpdate.name}`
                        )
                        setTimeout(() => {
                            setSuccesfulMessage(null)
                        }, 6000)
                    })
                    .catch(error => {
                        setErrorMessage(
                            `Information of ${personUpdate.name} has already been removed from server `
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 6000)
                    })
            }
            setNewName('')
            setNewNumber('')
        }else {
            const personObject = { name: newName, number: newNumber}
            personService
                .create(personObject)
                .then(initialPersons => {
                    setPersons(persons.concat(initialPersons))
                    setNewName('')
                    setNewNumber('')
                    setSuccesfulMessage(
                        `Added ${personObject.name}`
                    )
                    setTimeout(() => {
                        setSuccesfulMessage(null)
                    }, 6000)
                })
        }   
    }

    const removeNameOf = (id) => {
        const who = persons.find(n => n.id === id)
        console.log("who am I", who)
        if(window.confirm(`Delete ${who.name}`)) {
            personService
                .remove(who.id)
                .then(response => {
                    setSuccesfulMessage(
                        `${who.name} was deleted`
                    )
                    setTimeout(() => {
                        setSuccesfulMessage(null)
                    }, 6000)
                })
                .catch(error => {
                    setSuccesfulMessage(
                        `${who.name} was already deleted`
                    )
                    setTimeout(() => {
                        setSuccesfulMessage(null)
                    }, 6000)
                })
        }
    }

    const filterPhonebook = () => {
        const results = persons.filter(person => person.name.toLocaleLowerCase().includes(nameExists))
        const filtered = () => results.map(person =>
            <Person
            key={person.name}
            person={person.name}
            number={person.number}
            removeName={() => removeNameOf(person.id)}
            />
            )
        return filtered()
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilter = (event) => {
        setNameExists(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={succesfulMessage}/>
            <ErrorNotification message={errorMessage}/>
            <div>
                <Filter handleFilter={handleFilter}/>
            </div>
            <h2>Add new number</h2>
            <div>
                <Form 
                addPerson={addPerson}
                handleNumberChange={handleNumberChange}
                handleNameChange={handleNameChange}
                newName={newName}
                newNumber={newNumber}
                />
            </div>
            <h2>Numbers</h2> 
            <table>
                {filterPhonebook()}
            </table>
        </div>

    )
}

export default App

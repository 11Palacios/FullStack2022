import React, { useState } from 'react';
import Persons from './components/Persons';
import Form from './components/Form';
import Filter from './components/Filter';

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState(null)

    const handleNewName = (e) => {
        setNewName(e.target.value)
    }

    const handleNewNumber = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilter = (e) => {
        const prevPersons = [...persons]
        const filtered = prevPersons.filter( p => p.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setPersons(filtered)
    }

    const addPerson = (e) => {
        e.preventDefault()
        const exist = persons.filter(p => p.name === newName)
        if(exist.length === 0){
           let newPersons = [...persons]
        newPersons.push({name: newName, number: newNumber})
        setPersons(newPersons)
        document.getElementById('input').value=''
        setNewName('')
        document.getElementById('inputNumber').value=''
        setNewNumber(null)
        } else {
            alert(`${newName} already exist!`)
        }
        
    }


  
    return (
      <div>
        <h2>Phonebook</h2>
        <Filter handleFilter={handleFilter} />
        <Form handleNewName={handleNewName} handleNewNumber={handleNewNumber} addPerson={addPerson} />
        <Persons persons={persons} />
      </div>
    )
  }
  
  export default App
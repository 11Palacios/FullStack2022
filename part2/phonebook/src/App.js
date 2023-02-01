import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Form from './components/Form';
import Filter from './components/Filter';
import personService from './services/persons';

const App = () => {
    const [ persons, setPersons ] = useState(null) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState(null)

    useEffect(() => {
        personService.getAll()
          .then(allPersons => {
            setPersons(allPersons)
          })
    }, [])

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
          const personObject = {
            name: newName,
            number: newNumber
          }
          //
          personService.create(personObject)
          .then(response => {
            let newPersons = [...persons]
        newPersons.push(response)
        setPersons(newPersons)
        document.getElementById('input').value=''
        setNewName('')
        document.getElementById('inputNumber').value=''
        setNewNumber(null)
          })
          //
           
        } else {
            if(window.confirm(`${exist[0].name} already exist, replace the old number with a new one?`)){
              let newPersons = persons.filter(p => p.id !== exist[0].id)
              exist[0].number = newNumber;
              newPersons.push(exist[0])
              personService.update(exist[0])
              .then(
                setPersons(newPersons)
              )
            }else{
              console.log('false')
            }
        }
    }

    const handleErase = id => {
      let newPersons = persons.filter(n => n.id !== id)
      personService.erase(id)
      .then(
        setPersons(newPersons)
      )
    }
  
    return (
      <div>
        <h2>Phonebook</h2>
        {persons ? 
        <>
            <Filter handleFilter={handleFilter} />
            <Form handleNewName={handleNewName} handleNewNumber={handleNewNumber} addPerson={addPerson} />
            <Persons persons={persons} handleErase={handleErase}/>
        </>
        :
        <></>
        }
        
      </div>
    )
  }
  
  export default App
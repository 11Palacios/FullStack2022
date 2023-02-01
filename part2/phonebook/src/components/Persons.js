import React from 'react';
import Person from './Person';

const Persons = ({persons, handleErase}) => {

    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(p => <Person key={p.name} person={p} handleErase={handleErase}/>)}
        </div>
    );
}

export default Persons;

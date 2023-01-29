import React from 'react';
import Person from './Person';

const Persons = ({persons}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(p => <Person key={p.name} person={p} />)}
        </div>
    );
}

export default Persons;

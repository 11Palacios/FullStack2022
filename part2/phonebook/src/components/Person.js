import React from 'react';

const Person = ({person, handleErase}) => {
    
    return (
        <p key={person.name}>{person.name} {person.number} <button onClick={() => {if(window.confirm(`Delete ${person.name}?`)){handleErase(person.id)}}}>Delete</button></p>
    );
}

export default Person;

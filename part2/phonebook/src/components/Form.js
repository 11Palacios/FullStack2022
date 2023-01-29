import React from 'react';

const Form = ({handleNewName, handleNewNumber, addPerson}) => {
    return (
        <form>
            <h2>Add a new</h2>
          <div>
            name: <input id='input' onChange={handleNewName}/>
          </div>
          <div>
            number: <input id='inputNumber' onChange={handleNewNumber}/>
          </div>
          <div>
            <button type="submit" onClick={addPerson}>add</button>
          </div>
        </form>
    );
}

export default Form;

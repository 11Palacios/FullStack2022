import React from 'react';

const Total = ({course}) => {

    return (
        <div>
            <p><b>total of { course.parts.map(c => c.exercises).reduce((a, b) => a + b, 0) } exercises</b></p>
        </div>
    );
}

export default Total;

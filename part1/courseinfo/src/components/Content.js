import React from 'react';
import Part from './Part';

const Content = ({course}) => {
    
    return (
        <div>
            {course.parts.map(cours => (
                <Part key={cours.id} name={cours.name} exercises={cours.exercises} />
            ))}
        </div>
    );
}

export default Content;

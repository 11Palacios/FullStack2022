import React from 'react';

const Button = ({func, name}) => {
    return (
        <div>
            <button onClick={func}>{name}</button>
        </div>
    );
}

export default Button;

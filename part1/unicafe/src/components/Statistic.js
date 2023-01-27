import React from 'react';

const Statistic = ({name, number, symbol}) => {
    return (
        <>
        <td>{name}</td><td>{number} {symbol}</td>
        </>
            
    );
}

export default Statistic;

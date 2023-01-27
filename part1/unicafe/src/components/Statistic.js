import React from 'react';

const Statistic = ({name, number, symbol}) => {
    return (
            <p>{name} {number} {symbol}</p>
    );
}

export default Statistic;

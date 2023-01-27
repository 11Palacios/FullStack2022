import React from 'react';

const Statistics = ({good, neutral, bad, all, average, positive}) => {
    if(all > 0){
        
    }
    return (
        <div>
            <h1>statistic</h1>
            {all > 0 
            ? 
            <>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
                <p>all {all}</p>
                <p>average {average}</p>
                <p>positive {positive} %</p>
            </>
            :
            <>
            <p>No Feedback given</p>
            </>}
        </div>
    );
}

export default Statistics;

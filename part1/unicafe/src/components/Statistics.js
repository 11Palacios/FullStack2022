import React from 'react';
import Statistic from './Statistic';

const Statistics = ({good, neutral, bad, all, average, positive}) => {
    if(all > 0){
        
    }
    return (
        <div>
            <h1>statistic</h1>
            {all > 0 
            ? 
            <>
                <Statistic name='good' number={good} />
                <Statistic name='neutral' number={neutral} />
                <Statistic name='bad' number={bad} />
                <Statistic name='all' number={all} />
                <Statistic name='average' number={average} />
                <Statistic name='positive' number={positive} symbol="%" />
            </>
            :
            <>
            <p>No Feedback given</p>
            </>}
        </div>
    );
}

export default Statistics;

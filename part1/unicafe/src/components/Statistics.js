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
            <table>
                <tbody>
                    <tr><Statistic name='good' number={good} /></tr>
                    <tr><Statistic name='neutral' number={neutral} /></tr>
                    <tr><Statistic name='bad' number={bad} /></tr>
                    <tr><Statistic name='all' number={all} /></tr>
                    <tr><Statistic name='average' number={average} /></tr>
                    <tr><Statistic name='positive' number={positive} symbol="%" /></tr>
                </tbody>
            </table>
                
            </>
            :
            <>
            <p>No Feedback given</p>
            </>}
        </div>
    );
}

export default Statistics;

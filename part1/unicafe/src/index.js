import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const add = (type) => {
    switch (type) {
      case 'good':
        setGood(good+1)
        break;
      case 'neutral':
        setNeutral(neutral+1)
        break;
      case 'bad':
        setBad(bad+1)
        break;
      default:
        break;
    }
  }

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good * 100) / all;

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => add('good')}>good</button>
      <button onClick={() => add('neutral')}>neutral</button>
      <button onClick={() => add('bad')}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

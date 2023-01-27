import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const App = (props) => {
  const random = () => {
   return Math.floor(Math.random() * 6);
  } 

  const [selected, setSelected] = useState(random())
  const [votes, setVotes] = useState({ 0: 1, 1: 3, 2: 4, 3: 2, 4: 0, 5:0 })

  const next = () => {
    setSelected(random())
  }

  const vote = (i) => {
    console.log(props.anecdotes[i]);
      let nVotes = {...votes}
      nVotes[i]++
      setVotes(nVotes)
  }

  let values = [...Object.values(votes)];
  let maxV = Math.max(...Object.values(votes));
  let iValue = values.indexOf(maxV)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected] ? votes[selected] : <>0</>} votes</p>
      <button onClick={() => vote(selected)}>vote</button><button onClick={next}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[iValue]}</p>
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes}/>
  </React.StrictMode>
);
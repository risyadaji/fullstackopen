import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;
const Anecdote = ({ text, votes }) => {
  return (
    <>
      <div>{text}</div>
      <div>has {votes} votes</div>
    </>
  );
};

const randomNumber = (max) => Math.floor(Math.random() * max);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const totalAnecdotes = anecdotes.length;

  const [votes, setVotes] = useState(Array(totalAnecdotes).fill(0));
  const [selected, setSelected] = useState(randomNumber(totalAnecdotes));
  const [maxVoteIndex, setMaxVoteIndex] = useState(0);

  const onNextClick = () => setSelected(randomNumber(totalAnecdotes));
  const onVoteClick = () => {
    const newVote = [...votes]; // avoid mutate array
    newVote[selected]++;
    setVotes(newVote);

    // update maxVote and re-render anecdote most votes
    if (newVote[selected] > newVote[maxVoteIndex]) {
      setMaxVoteIndex(selected);
    }
  };

  return (
    <>
      <Header title="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" onClick={onVoteClick} />
      <Button text="next anecdote" onClick={onNextClick} />

      <Header title="Anecdote with most votes" />
      <Anecdote text={anecdotes[maxVoteIndex]} votes={votes[maxVoteIndex]} />
    </>
  );
};

export default App;

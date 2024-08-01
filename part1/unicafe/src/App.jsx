import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Statistic = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let total = good - bad;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={total / all} />
        <StatisticLine text="positive" value={(good / all) * 100 + " %"} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onClickGood = () => setGood(good + 1);
  const onClickNeutral = () => setNeutral(neutral + 1);
  const onClickBad = () => setBad(bad + 1);

  return (
    <div>
      <Header title="give feedback" />
      <Button text="good" onClick={onClickGood} />
      <Button text="neutral" onClick={onClickNeutral} />
      <Button text="bad" onClick={onClickBad} />
      <Header title="statistic" />
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

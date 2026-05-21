import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text} </td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const average = totalFeedback === 0 ? 0 : (good - bad) / totalFeedback;
  const posPercentage = totalFeedback === 0 ? 0 : (100 * good) / totalFeedback;

  return (
    <>
      <h2>Statistics</h2>
      {!totalFeedback ? (
        <p>No Feedback Given Yet</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text={"Good"} value={good} />
            <StatisticLine text={"Neutral"} value={neutral} />
            <StatisticLine text={"Bad"} value={bad} />
            <StatisticLine text={"All"} value={totalFeedback} />
            <StatisticLine text={"Average"} value={average.toFixed(2)} />
            <StatisticLine
              text={"Positive"}
              value={`${posPercentage.toFixed(2)}%`}
            />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <>
      <h1>Give Feedback</h1>

      <Button onClick={handleGoodClick} text={"Good"} />
      <Button onClick={handleNeutralClick} text={"Neutral"} />
      <Button onClick={handleBadClick} text={"Bad"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;

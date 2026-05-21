import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const totalFeedback = good + neutral + bad;
  const calculateAverage =
    totalFeedback === 0 ? 0 : (good - bad) / totalFeedback;
  const calculatePositive =
    totalFeedback === 0 ? 0 : (100 * good) / totalFeedback;
  return (
    <>
      <h1>Give Feedback</h1>

      <Button onClick={handleGoodClick} text={"Good"} />
      <Button onClick={handleNeutralClick} text={"Neutral"} />
      <Button onClick={handleBadClick} text={"Bad"} />

      <h2>Statistics</h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {totalFeedback}</p>
      <p>Average {calculateAverage}</p>
      <p>Positive {calculatePositive} %</p>
    </>
  );
};

export default App;

import { useEffect, useState } from "react";

import Question from "./components/Question";
import { questions } from "./questionsData";
import Result from "./components/Result";
function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[currentIndex]
  );
  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
    skipped: 0,
  });
  const [userChoises, setUserChoises] = useState([]);

  useEffect(() => {
    setCurrentQuestion(questions[currentIndex]);
  }, [currentIndex]);

  return (
    <>
      {currentQuestion?.question ? (
        <Question
          question={currentQuestion.question}
          choices={[
            currentQuestion.A,
            currentQuestion.B,
            currentQuestion.C,
            currentQuestion.D,
          ]}
          answer={currentQuestion.answer}
          setCurrentIndex={setCurrentIndex}
          score={score}
          setScore={setScore}
          setUserChoises={setUserChoises}
          currentIndex={currentIndex}
        />
      ) : (
        <Result
          score={score}
          setScore={setScore}
          setUserChoises={setUserChoises}
          userChoises={userChoises}
          questions={questions}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </>
  );
}

export default App;

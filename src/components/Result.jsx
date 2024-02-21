import { useEffect } from "react";
import img from "../assets/quiz-complete.png";

let obj = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};
const Result = function ({
  score,
  userChoises,
  questions,
  setCurrentIndex,
  setScore,
  setUserChoises,
}) {
  useEffect(() => {
    console.log(score, userChoises, questions);
  }, []);

  let skippedRatio = (score.skipped / questions.length) * 100;
  let correctRatio = (score.correct / questions.length) * 100;
  let wrongRatio = (score.wrong / questions.length) * 100;

  function handleReset() {
    setCurrentIndex(0);
    setScore({
      correct: 0,
      wrong: 0,
      skipped: 0,
    });
    setUserChoises([]);
  }
  return (
    <div className=" bg-violet-500 rounded-2xl shadow-2xl mx-auto flex flex-col gap-8 items-center py-6 md:w-3/4">
      <img src={img} alt="prize" className="size-20 " />
      <h1 className="uppercase font-bold text-transparent text-5xl bg-clip-text   tracking-widest text-gray-800 ">
        quiz completed!
      </h1>
      <div className="flex gap-14 text-gray-700 justify-center">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-6xl">{skippedRatio}%</p>
          <p className="uppercase">Skipped</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-6xl">{correctRatio}%</p>
          <p className="uppercase">
            answered
            <br />
            correctly
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-6xl">{wrongRatio}%</p>
          <p className="uppercase">
            answered
            <br />
            uncorrectly
          </p>
        </div>
      </div>
      <button
        onClick={handleReset}
        className="py-3 px-6 bg-lime-900 rounded-xl shadow-lg text-2xl ml-auto mr-20  text-stone-300 hover:text-white sticky top-3   "
      >
        Try again
      </button>
      <hr className=" w-1/2 border border-gray-700 " />

      <ul className="flex flex-col gap-8 items-center">
        {questions.map((question, i) => (
          <li key={i} className="flex flex-col gap-2 items-center">
            <span className="py-3 px-4 rounded-full bg-gray-800 text-sm text-slate-300">
              {i + 1}
            </span>
            <p className="text-gray-800 text-xl text-center md:text-2xl">
              {question.question}
            </p>
            {userChoises[i] === "-" ? (
              <p className="text-amber-700 font-bold text-2xl">
                {question[question.answer]} (Skipped)
              </p>
            ) : obj[userChoises[i]] === question.answer ? (
              <p className="text-green-600 font-bold text-2xl">
                {question[obj[userChoises[i]]]}
              </p>
            ) : (
              <p className="text-rose-800 font-bold text-2xl">
                {question[obj[userChoises[i]]]}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;

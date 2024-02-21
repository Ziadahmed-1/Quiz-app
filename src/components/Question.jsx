import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import { questions } from "../questionsData.js";

const Question = function ({
  question,
  choices,
  answer,
  score,
  setScore,
  setCurrentIndex,
  setUserChoises,
  currentIndex,
}) {
  let correct;
  let wrong;
  let skipped;

  let obj = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
  };

  let commonStyle =
    "text-center hover:bg-purple-800 bg-blue-500 rounded-full py-3 text-xl transition-all hover:cursor-pointer tracking-wider shadow-xl";

  const [timeRemaining, setTimeRemaining] = useState(10000);
  const [selectedStyle, setSelectedStyle] = useState(commonStyle);
  const [otherChoisesStyle, setOtherChoisesStyle] = useState(commonStyle);
  const [selected, setSelected] = useState(null);

  let timer;
  useEffect(() => {
    correct = +score.correct;
    wrong = +score.wrong;
    skipped = +score.skipped;

    timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prev) => prev - 10);
      } else {
        handleSkipped();
      }
    }, 10);
    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining]);

  function hanleChoose(i) {
    setUserChoises((prev) => [...prev, i]);
    let selectedIndex = i;
    setSelected(selectedIndex);
    if (i === obj[answer]) {
      handleCorrect();
    } else handleWrong();
    clearInterval(timer);
  }
  function handleSkipped() {
    setUserChoises((prev) => [...prev, "-"]);
    setScore((x) => {
      return { ...x, skipped: +skipped + 1 };
    });
    console.log("skipped");
    setSelectedStyle((prev) => prev + " bg-yellow-500");
    setOtherChoisesStyle(
      (prev) => prev + " bg-orange-400 hover:bg-orange-500 cursor-not-allowed"
    );
    clearInterval(timer);
    handleGoNext();
  }

  function handleCorrect() {
    setScore((x) => {
      return { ...x, correct: +correct + 1 };
    });
    setSelectedStyle((prev) => prev + " bg-green-500 hover:bg-green-600");
    setOtherChoisesStyle(
      (prev) => prev + " bg-orange-400 hover:bg-orange-500 cursor-not-allowed"
    );
    console.log("Correct");
    handleGoNext();
  }
  function handleWrong() {
    setScore((x) => {
      return { ...x, wrong: +wrong + 1 };
    });
    setSelectedStyle((prev) => prev + " bg-rose-500 hover:bg-rose-600");
    setOtherChoisesStyle(
      (prev) => prev + " bg-orange-400 hover:bg-orange-500 cursor-not-allowed"
    );
    console.log("Wrong");
    handleGoNext();
  }

  function handleGoNext() {
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setTimeRemaining(10000);
      setSelected(null);
      setSelectedStyle(commonStyle);
      setOtherChoisesStyle(commonStyle);
    }, 1000);
  }

  return (
    <>
      <Header />

      <div className="relative mt-8  min-w-2/3 lg:w-3/5 mx-auto bg-indigo-950 pt-10 pb-14 rounded-2xl shadow-2xl flex flex-col gap-3 items-center">
        <div className="w-1/3 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${timeRemaining / 100}%` }}
          ></div>
        </div>
        <div className="absolute bg-sky-600 rounded-lg  px-2 py-1 left-5 top-5 text-lg font-semibold">
          Question : {currentIndex + 1}/{questions.length}
        </div>

        <h3 className="mt-6 px-12 text-stone-200 text-3xl text-center tracking-wide mb-10">
          {question}
        </h3>
        <ol className="flex flex-col gap-5 w-1/2">
          {choices.map((choice, i) => (
            <li
              className={selected === i ? selectedStyle : otherChoisesStyle}
              key={i}
              onClick={() => {
                selected !== null ? null : hanleChoose(i);
              }}
            >
              {choice}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Question;

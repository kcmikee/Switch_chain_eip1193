import React from "react";
import { useQuiz } from "../contexts/QuizContext";
import { quizData } from "../data/quizData";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";

const QuizContainer: React.FC = () => {
  const { state, dispatch } = useQuiz();

  if (state.isFinished) {
    return <ResultCard />;
  }

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_QUESTION" });
  };

  const handleNext = () => {
    if (state.currentQuestionIndex === quizData.length - 1) {
      dispatch({ type: "FINISH_QUIZ" });
    } else {
      dispatch({ type: "NEXT_QUESTION" });
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
      <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
        Question {state.currentQuestionIndex + 1} of {quizData.length}
      </h2>
      <QuestionCard question={quizData[state.currentQuestionIndex]} />
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={state.currentQuestionIndex === 0}
          className="px-4 py-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          //   disabled={state.currentQuestionIndex === quizData.length - 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
        >
          {state.currentQuestionIndex === quizData.length - 1
            ? "Finish"
            : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizContainer;

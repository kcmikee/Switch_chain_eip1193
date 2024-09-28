import React from "react";
import { useQuiz } from "../contexts/QuizContext";
import { quizData } from "../data/quizData";

const ResultCard: React.FC = () => {
  const { state, dispatch } = useQuiz();

  return (
    <div className="w-full max-w-md p-6 text-center bg-white rounded-lg shadow-xl">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Quiz Completed!</h2>
      <p className="mb-4 text-xl text-gray-700">
        Your score: {state.score} out of {quizData.length}
      </p>
      <p className="text-lg text-gray-600">
        {state.score === quizData.length
          ? "Perfect score! Congratulations!"
          : state.score > quizData.length / 2
          ? "Great job! You did well."
          : "Keep practicing, you'll do better next time!"}
      </p>
      <button
        onClick={() => dispatch({ type: "RESTART_QUIZ" })}
        className="px-4 py-2 text-white bg-blue-500 rounded-md mt-2.5"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultCard;

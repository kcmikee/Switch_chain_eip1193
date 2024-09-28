import React from "react";
import { useQuiz } from "../contexts/QuizContext";
import { quizData } from "../data/quizData";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";

const QuizContainer: React.FC = () => {
  const { state } = useQuiz();

  if (state.isFinished) {
    return <ResultCard />;
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Question {state.currentQuestionIndex + 1} of {quizData.length}
      </h2>
      <QuestionCard question={quizData[state.currentQuestionIndex]} />
    </div>
  );
};

export default QuizContainer;

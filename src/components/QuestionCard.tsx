import React from "react";
import { useQuiz } from "../contexts/QuizContext";
import { quizData } from "../data/quizData";

type QuestionCardProps = {
  question: (typeof quizData)[0];
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { state, dispatch } = useQuiz();

  const handleAnswer = (selectedAnswer: string) => {
    dispatch({ type: "SELECT_ANSWER", payload: { answer: selectedAnswer } });
  };

  return (
    <div>
      <h3 className="mb-4 text-xl text-gray-700">{question.question}</h3>
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option}
            className={`w-full p-2 text-left rounded transition duration-300 ${
              state.answers[state.currentQuestionIndex] === option
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;

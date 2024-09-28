import React from "react";
import { useQuiz } from "../contexts/QuizContext";
import { quizData } from "../data/quizData";

type QuestionCardProps = {
  question: (typeof quizData)[0];
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { state, dispatch } = useQuiz();

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === question.correctAnswer) {
      dispatch({ type: "ANSWER_CORRECT" });
    }

    if (state.currentQuestionIndex === quizData.length - 1) {
      dispatch({ type: "FINISH_QUIZ" });
    } else {
      dispatch({ type: "NEXT_QUESTION" });
    }
  };

  return (
    <div>
      <h3 className="text-xl mb-4 text-gray-700">{question.question}</h3>
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option}
            className="w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded transition duration-300"
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

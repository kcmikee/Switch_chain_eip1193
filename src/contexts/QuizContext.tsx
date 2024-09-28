import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { quizData } from "../data/quizData";

type QuizState = {
  currentQuestionIndex: number;
  score: number;
  isFinished: boolean;
  answers: (string | null)[];
};

type QuizAction =
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | { type: "SELECT_ANSWER"; payload: { answer: string } }
  | { type: "FINISH_QUIZ" }
  | { type: "RESTART_QUIZ" };

const initialState: QuizState = {
  currentQuestionIndex: 0,
  score: 0,
  isFinished: false,
  answers: [],
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case "NEXT_QUESTION":
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case "SELECT_ANSWER": {
      const newAnswers = [...state.answers];
      newAnswers[state.currentQuestionIndex] = action.payload.answer;
      const newScore = newAnswers.reduce(
        (score, answer, index) =>
          answer === quizData[index].correctAnswer ? score + 1 : score,
        0
      );
      return { ...state, answers: newAnswers, score: newScore };
    }
    case "FINISH_QUIZ":
      return { ...state, isFinished: true };
    case "RESTART_QUIZ":
      return initialState;
    default:
      return state;
  }
};

const QuizContext = createContext<
  | {
      state: QuizState;
      dispatch: React.Dispatch<QuizAction>;
    }
  | undefined
>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

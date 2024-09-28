import React, { createContext, useContext, useReducer, ReactNode } from "react";

type QuizState = {
  currentQuestionIndex: number;
  score: number;
  isFinished: boolean;
};

type QuizAction =
  | { type: "NEXT_QUESTION" }
  | { type: "ANSWER_CORRECT" }
  | { type: "FINISH_QUIZ" }
  | { type: "RESTART_QUIZ" };

const initialState: QuizState = {
  currentQuestionIndex: 0,
  score: 0,
  isFinished: false,
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case "NEXT_QUESTION":
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
    case "ANSWER_CORRECT":
      return { ...state, score: state.score + 1 };
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

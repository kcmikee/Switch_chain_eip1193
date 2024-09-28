import React from "react";
import { QuizProvider } from "./contexts/QuizContext";
import QuizContainer from "./components/QuizContainer";

const App: React.FC = () => {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
        <QuizContainer />
      </div>
    </QuizProvider>
  );
};

export default App;

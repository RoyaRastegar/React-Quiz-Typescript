import React, { useState } from "react";
// components
import QuestionCard from "./components/Quiz";
import { fetchQuizQuestion } from "./API";
// type
import { Difficulty, QuestionState } from "./API";
import { GlobalStyle, Wrapper } from "./App.styled";
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTION = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestion] = useState<QuestionState[]>([]);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [ganeOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestion(TOTAL_QUESTION, Difficulty.EASY));
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestion = await fetchQuizQuestion(
      TOTAL_QUESTION,
      Difficulty.EASY
    );
    setQuestion(newQuestion);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ganeOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };
  const nextQuiztion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {ganeOver || userAnswer.length === TOTAL_QUESTION ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!ganeOver ? <p className="score">Score:{score}</p> : null}
        {loading && <p>Quiztion Loading ...</p>}

        {!loading && !ganeOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestion={TOTAL_QUESTION}
            answers={questions[number].answers}
            question={questions[number].question}
            callBack={checkAnswer}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
          />
        )}
        {!ganeOver &&
        !loading &&
        userAnswer.length === number + 1 &&
        number !== TOTAL_QUESTION - 1 ? (
          <button className="next" onClick={nextQuiztion}>
            Next
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;

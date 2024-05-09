import React from "react";
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./Quiz.styled";

type Props = {
  question: string;
  answers: string[];
  questionNr: number;
  userAnswer: AnswerObject | undefined;
  callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
  totalQuestion: number;
};
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  questionNr,
  userAnswer,
  callBack,
  totalQuestion,
}) => (
  <Wrapper>
    <p className="number">
      Question : {questionNr}/{totalQuestion}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button disabled={!!userAnswer} value={answer} onClick={callBack}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;

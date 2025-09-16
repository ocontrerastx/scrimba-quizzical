import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { clsx } from "clsx";
import "./App.css";

function App() {
  const [isQuizInProgress, setIsQuizInProgress] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [processedQuestions, setProcessedQuestions] = useState([]);
  const [gradingQuiz, setGradingQuiz] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (processedQuestions.length > 0) return;

    async function fetchAndProcessData() {
      try {
        const apiResponse = await fetch("https://opentdb.com/api.php?amount=5");
        if (!apiResponse.ok) throw new Error("API call failed");
        let data = await apiResponse.json();
        const processed = data.results.map((item) => {
          const question = decode(item.question);
          const correct_answer = decode(item.correct_answer);
          const answers = item.incorrect_answers.map((answer) =>
            decode(answer)
          );
          const randomIndex = Math.floor(Math.random() * (answers.length + 1));

          answers.splice(randomIndex, 0, correct_answer);

          return {
            question,
            answers,
            correct_answer,
            correctIndex: randomIndex,
          };
        });

        setProcessedQuestions(processed);
      } catch (err) {
        console.error("Failed to fetch quiz data:", err);
      }
    }

    fetchAndProcessData();
  }, [processedQuestions.length]);

  function selectAnswer(questionIndex, answerIndex) {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  }

  const questionElements = processedQuestions.map((item, questionIndex) => {
    const answerElements = item.answers.map((answer, answerIndex) => {
      const isSelected = selectedAnswers[questionIndex] === answerIndex;
      const isCorrect = isSelected && answerIndex === item.correctIndex;
      const isWrong = isSelected && !(answerIndex === item.correctIndex);
      return (
        <p
          onClick={() => selectAnswer(questionIndex, answerIndex)}
          key={answerIndex}
          className={clsx({
            selected: isSelected,
            correct: gradingQuiz && isCorrect,
            wrong: gradingQuiz && isWrong,
            "not-selected": gradingQuiz && !isSelected,
          })}
        >
          {answer}
        </p>
      );
    });

    return (
      <div key={questionIndex} className="quiz-question">
        <h2>{item.question}</h2>
        <div className="quiz-answers">{answerElements}</div>
      </div>
    );
  });

  function startQuiz() {
    setIsQuizInProgress((prevQuizProgress) => !prevQuizProgress);
  }

  function gradeQuiz() {
    setGradingQuiz(true);

    const results = Object.entries(selectedAnswers).map(
      ([questionIndex, answerIndex]) => {
        const question = processedQuestions[questionIndex];
        const selectedAnswer = question.answers[answerIndex];
        const isCorrect = selectedAnswer === question.correct_answer;

        return isCorrect;
      }
    );

    const finalScore = results.filter(Boolean).length;
    setScore(finalScore);
  }

  function startNewQuiz() {
    setProcessedQuestions([]);
    setSelectedAnswers({});
    setGradingQuiz(false);
    setScore(0);
  }

  return (
    <>
      {!isQuizInProgress && (
        <div id="start">
          <h1>Quizzical</h1>
          <p>Can you answer all 5 trivia questions correct?</p>
          <button className="primary" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      )}
      {isQuizInProgress && (
        <div id="quiz-container">
          {questionElements}
          <div className="check-answers">
            <p>
              {gradingQuiz &&
                `You scored ${score}/${processedQuestions.length} correct answers`}
            </p>
            {gradingQuiz ? (
              <button onClick={startNewQuiz} className="primary">
                Play Again
              </button>
            ) : (
              <button onClick={gradeQuiz} className="primary">
                Check Answers
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;

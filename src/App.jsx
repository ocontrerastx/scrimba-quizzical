import { useState, useEffect } from "react";
import { decode } from "html-entities";
import "./App.css";

function App() {
  const [isQuizInProgress, setIsQuizInProgress] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [processedQuestions, setProcessedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAndProcessData() {
      try {
        setLoading(true);
        setError(false);

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
        setError(err.message);
        console.error("Failed to fetch quiz data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAndProcessData();
  }, []);

  function selectAnswer(questionIndex, answerIndex) {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  }

  const questionElements = processedQuestions.map((item, questionIndex) => {
    const answerElements = item.answers.map((answer, answerIndex) => {
      const isSelected = selectedAnswers[questionIndex] === answerIndex;

      return (
        <p
          onClick={() => selectAnswer(questionIndex, answerIndex)}
          key={answerIndex}
          className={isSelected ? "quiz-answer-selected" : ""}
        >
          {decode(answer)}
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
          <button className="primary">Check Answers</button>
        </div>
      )}
    </>
  );
}

export default App;

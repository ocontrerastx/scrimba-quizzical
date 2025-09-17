# Quizzical - Interactive Trivia Quiz App

This project involves creating an interactive trivia quiz application built with React that fetches questions from the Open Trivia Database API, based on the design provided in the following Figma file:
[Figma Design](https://www.figma.com/design/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=8-2&t=7jQfFfW3PBpEHOMz-1)

The app challenges users to answer 5 multiple-choice trivia questions and provides immediate feedback on their performance with visual indicators for correct and incorrect answers.

Players start the quiz, select answers for each question, and then check their results to see how many they answered correctly. The interface provides clear visual feedback with color-coded answers and an engaging user experience throughout the quiz-taking process.

## Setup Requirements

To run this project locally:

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Dependencies

- `html-entities`: For decoding HTML entities in quiz questions and answers
- `clsx`: For conditional CSS class management

## Key Concepts Applied:

**React State Management with Multiple State Variables:** Implemented comprehensive state management using multiple `useState` hooks to track quiz progress (`isQuizInProgress`), processed questions (`processedQuestions`), user selections (`selectedAnswers`), and grading status (`gradingQuiz`). The `isQuizInProgress` state was essential for conditional rendering between the welcome screen and quiz interface, as our class had not yet covered routing. The `processedQuestions` state handles the transformed API data, while `gradingQuiz` enables conditional class application for visual feedback colors.

**useEffect Hook for External System Integration:** Leveraged React's `useEffect` hook to interact with an outside system—the Open Trivia Database API—to load quiz data. This demonstrated the core purpose of `useEffect` for handling side effects and external system interactions in React applications.

**Object State Updates - New Data Structure Exploration:** Implemented object-based state management for `selectedAnswers`, which required extensive research and trial-and-error learning. This was a significant departure from previously used array data structures, necessitating deep exploration of object manipulation, property access, and iteration patterns. The learning process involved understanding how to update objects immutably using spread syntax and computed property names.

**ES6+ JavaScript Features:** Incorporated modern JavaScript features throughout the application:

- Object property shorthand syntax for cleaner object creation
- Template literals for dynamic string construction
- Arrow functions for concise callback definitions
- Array methods like `.map()` for rendering dynamic content

**Conditional Rendering Patterns:** Created sophisticated conditional rendering logic that manages different application states:

- Welcome screen with start button before quiz begins
- Active quiz interface with questions and selectable answers
- Results view with visual feedback after answer checking

## Learning Journey Highlights:

Working with objects for state management was completely new territory. Having only used arrays before, implementing the `selectedAnswers` object required research into object property access, `Object.entries()` for iteration, and immutable update patterns with spread syntax.

When I got stuck, Claude recommended using an object to store `selectedAnswers`, which led to researching object manipulation techniques and how to iterate through objects for quiz grading. This showed how AI can guide you toward new programming patterns when you hit roadblocks.

After finishing the project, I rebuilt the entire application from scratch to make sure I understood the object concepts, since they were unfamiliar. This helped solidify the differences between array and object data structures in JavaScript.

Using multiple state variables required coordination between `isQuizInProgress` for conditional rendering (since we hadn't learned routing yet), `processedQuestions` for API data, and `gradingQuiz` for applying color classes.

The `useEffect` hook provided hands-on experience with external system integration through API calls, demonstrating its core purpose for handling side effects in React applications.

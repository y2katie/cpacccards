import { useState, useRef } from "react";
import "./MemoryGame.css";
import shuffle from "./shuffle";

// Questions and Answers (should be paired by their index)
const questions = ["POUR Principle - Perceivable", "POUR Principle - Operable", "POUR Principle - Understandable", "POUR Principle - Robust", "Assistive Technology"];
const answers = ["Information and user interface components must be presented to users in ways they can perceive.", "User interface components and navigation must be operable by users in a variety of ways.", "Information and the operation of the user interface must be understandable to all users","Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.", "Devices or software designed to help people with disabilities interact with digital content, like screen readers or magnifiers" ];




// Create a combined and shuffled array of questions and answers
const items = questions.concat(answers);
const allItems = shuffle([...items]); // Shuffle combined items

const defaultState = { index: null, value: null };

export default function MemoryGame() {
  const [firstCard, setFirstCard] = useState(defaultState);
  const [secondCard, setSecondCard] = useState(defaultState);
  const [matchedIndices, setMatchedIndices] = useState([]); // Track indices of matched cards
  const [moves, setMoves] = useState(0);

  const timer = useRef();

  // Helper function to check if two items match (either question-answer or answer-question)
  const isMatch = (firstValue, secondValue) => {
    const firstIndexInQuestions = questions.indexOf(firstValue);
    const secondIndexInAnswers = answers.indexOf(secondValue);
    const firstIndexInAnswers = answers.indexOf(firstValue);
    const secondIndexInQuestions = questions.indexOf(secondValue);

    // Check for matching question-answer pair
    return (
      (firstIndexInQuestions !== -1 && secondIndexInAnswers !== -1 && firstIndexInQuestions === secondIndexInAnswers) ||
      (firstIndexInAnswers !== -1 && secondIndexInQuestions !== -1 && firstIndexInAnswers === secondIndexInQuestions)
    );
  };

  const handleClick = (index, value) => {
    // If the card is already matched or the same card is clicked again, do nothing
    if (matchedIndices.includes(index) || firstCard.index === index || secondCard.index === index) {
      return;
    }

    // Clear the timer if a card is clicked before the previous timer runs out
    clearTimeout(timer.current);

    // If no cards are currently flipped
    if (firstCard.index === null) {
      setFirstCard({ index, value });
      setMoves((moves) => moves + 1);
    } else if (secondCard.index === null) { 
      // If the first card is flipped and we are flipping the second card
      setSecondCard({ index, value });
      setMoves((moves) => moves + 1);

      // Check if it's a match
      if (isMatch(firstCard.value, value)) {
        // Keep the matched cards flipped
        setMatchedIndices([...matchedIndices, firstCard.index, index]);
        setFirstCard(defaultState);
        setSecondCard(defaultState);
      } else {
        // If not a match, flip the cards back after a short delay
        timer.current = setTimeout(() => {
          setFirstCard(defaultState);
          setSecondCard(defaultState);
        }, 1000);
      }
    }
  };

  return (
    <>
    <h1> Accessibility Principles & Guidelines</h1>
      {matchedIndices.length / 2 < questions.length ? `Remaining pairs: ${questions.length - matchedIndices.length / 2}` : "Victory!"}
      <div className="cardsContainer">
        {allItems.map((item, index) => {
          const isFlipped = 
            firstCard.index === index || 
            secondCard.index === index || 
            matchedIndices.includes(index);

          return (
            <div
              key={index}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleClick(index, item)}
            >
              <div className="backSide"></div>
              <div className="frontSide">
                {isFlipped ? item : ""}
              </div>
            </div>
          );
        })}
      </div>
      Moves used: {moves}
    </>
  );
}
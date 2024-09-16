import logo from './logo.svg';
import React, {useState} from "react";
import Flashcardlist from "./Flashcardlist";
import './App.css';

function App() {
  
    const question_list = [
      {
        question:"what is the cpacc",
        answer:"answer a test",
        options: ["this", "is", "a", "test"]
      },
      {
        question:"what is the cpacc",
        answer:"answer a test",
        options: ["this", "is", "a", "test"]
      }
    ]

    const [array, setArray] = useState(question_list);

    return (
      <div>
        <Flashcardlist flashcards={array} />
      </div>
    )
  
}

export default App;
